import crypto from "crypto";
import { createOrder } from "../../db/orders.js";

export default async function createCheckout(req, res) {

  try {
    const items = req.body;

    if (!Array.isArray(items) || !items.length) {
      return res.status(400).json({ error: "No items provided" });
    }

    const internalOrderId = crypto.randomUUID();

    const lineItems = items.map((item) => ({
      quantity: "1",
      catalog_object_id: item.item_data.variations[0].id,
    }));

    const catalogObjectIds = items.map((item) => item.item_data.variations[0].id);

    const inventoryResp = await fetch(
      "https://connect.squareup.com/v2/inventory/counts/batch-retrieve",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          catalog_object_ids: catalogObjectIds,
        }),
      },
    );

    const inventoryRespData = await inventoryResp.json();

    if (!inventoryResp.ok) {
      console.error("Square inventory error:", inventoryRespData);
      return res.status(inventoryResp.status).json({
        status: "error",
        msg: "Failed to verify inventory",
        details: inventoryRespData.errors,
      });
    }

    const itemsOutOfStock = (inventoryRespData.counts || [])
      .filter((item) => Number(item.quantity) <= 0)
      .map((el) => {
        const checkoutItem = items.find(
          (elm) => elm.item_data.variations[0].id === el.catalog_object_id,
        );

        return {
          ...el,
          itemName: checkoutItem?.item_data.name,
          itemId: checkoutItem?.id,
        };
      });

    if (itemsOutOfStock.length > 0) {
      return res.json({
        status: "error",
        msg: "Items no longer available were removed.",
        itemsOutOfStock,
      });
    }

    const response = await fetch(
      "https://connect.squareup.com/v2/online-checkout/payment-links",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: "api created payment link",
          idempotency_key: crypto.randomUUID(),
          order: {
            location_id: process.env.SQUARE_LOCATION_ID,
            line_items: lineItems,
            reference_id: internalOrderId,
          },
          checkout_options: {
            ask_for_shipping_address: true,
            enable_coupon: false,
            enable_loyalty: false,
            redirect_url: `${process.env.BASE_URL}/success?referenceId=${internalOrderId}`,
          },
        }),
      },
    );

    const responseData = await response.json();

    if (!response.ok) {
      console.error("Square checkout error:", responseData);
      return res.status(response.status).json({
        status: "error",
        msg: "Failed to create Square checkout",
        details: responseData.errors,
      });
    }

    await createOrder({
      order_id: responseData.payment_link.order_id,
      id: responseData.payment_link.order_id,
      status: "PENDING",
      reference_id: internalOrderId,
      lineItems,
    });

    return res.json({
      checkoutUrl: responseData.payment_link.long_url,
    });
  } catch (err) {
    console.error("create-checkout error:", err);
    return res.status(500).json({ status: "error", msg: "Failed to create checkout" });
  }
}
