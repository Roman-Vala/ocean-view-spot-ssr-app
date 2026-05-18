import crypto from 'crypto';

export default  async function getItemById(req, res) {
  const controller = new AbortController();
  const { itemId } = req.params;

  try {
    const baseUrl = "https://connect.squareup.com/v2";

    const itemUrl = `${baseUrl}/catalog/object/${itemId}?include_related_objects=true&include_category_path_to_root=true`;
    const searchURL = `${baseUrl}/catalog/search`

    const headers = {
      Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    };

    // 0. Fetch catalog latest time to calculate ETag
    const catResp = await fetch(searchURL, {
      method: "POST",
      headers,
      body:JSON.stringify({object_types: ['TAX'],limit:1}),
      signal: controller.signal,
    })
    const catData = await catResp.json();
    const versionString = catData.latest_time;
    // console.log(versionString);
    const etag = crypto.createHash("sha1").update(versionString).digest("hex");
    const clientETag = req.headers["if-none-match"];

    if (clientETag === etag) {
      return res.status(304).end();
    }
    
    // 1. Fetch catalog item    
    const itemRes = await fetch(itemUrl, {
      headers,
      signal: controller.signal,
    });

    if (!itemRes.ok) {
      return res.status(500).json({ error: "Failed to fetch catalog item" });
    }

    const itemData = await itemRes.json();

    const catalogObject = itemData?.object || null;
    const relatedObjects = itemData?.related_objects || [];

    
    // 2. Extract variation IDs    
    const variationIds =
      catalogObject?.item_data?.variations
        ?.map((v) => v.id)
        .filter(Boolean) || [];
    
    // 3. Fetch inventory by variation IDs    
    let inventoryMap = {};

    if (variationIds.length > 0) {
      const inventoryUrl = `${baseUrl}/inventory/counts/batch-retrieve`;

      const inventoryRes = await fetch(inventoryUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          catalog_object_ids: variationIds
        }),
        signal: controller.signal,
      });

      if (!inventoryRes.ok) {
        return res
          .status(500)
          .json({ error: "Failed to fetch inventory" });
      }

      const inventoryData = await inventoryRes.json();

      // Map inventory by variation ID
      inventoryMap =
        inventoryData?.counts?.reduce((acc, item) => {
          acc[item.catalog_object_id] = item.quantity;
          return acc;
        }, {}) || {};
    }

    
    // 4. Extract images    
    const imageIds = catalogObject?.item_data?.image_ids || [];
    const images = imageIds.map(
      imgId => relatedObjects.find(el => el.id === imgId).image_data?.url
    );
    
    // 5. Attach inventory to variations    
    const enrichedVariations =
      catalogObject?.item_data?.variations?.map((v) => ({
        ...v,
        inventoryCount: inventoryMap[v.id] ?? 0,
      })) || [];

    
    // 6. Final response
    res.setHeader("ETag", etag);
    return res.json({
      itemId,
      item: {
        ...catalogObject,
        item_data: {
          ...catalogObject?.item_data,
          variations: enrichedVariations,
        },
      },
      images,
    });
  } catch (err) {
    if (err.name === "AbortError") {
      return res.status(499).json({ error: "Request aborted" });
    }

    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

