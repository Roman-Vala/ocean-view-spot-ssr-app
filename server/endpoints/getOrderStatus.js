import { getOrderById } from "../../db/orders.js";

 
export default async function getOrderStatus(req, res) {
  
  const { orderId } = req.query;

  if (!orderId) {
    return res.status(400).json({ status: "FAILED" });
  }

  try {
    const order = await getOrderById(orderId);

    if (!order) {
      return res.json({ status: "PENDING" });
    }

    let status = "PENDING";

    switch (order.status) {
      case "COMPLETED":
        status = "COMPLETED";
        break;

      case "FAILED":
      case "EXPIRED":
      case "CANCELED":
        status = "FAILED";
        break;
    }

    return res.json({
      status,
      // order: status === "COMPLETED"
      //   ? {
      //       id: order.id,
      //       totalMoney: order.totalMoney,
      //       lineItems: order.lineItems
      //     }
      //   : undefined
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "FAILED" });
  }
};

