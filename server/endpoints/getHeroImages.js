// controllers/users.controller.js
export default async function getHeroImages(req, res, next) { 

  try {
    const response = await fetch('https://connect.squareup.com/v2/catalog/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        object_types: ['ITEM'],
        include_related_objects: true,
        include_category_path_to_root: true,
        query: {
          exact_query: {
            attribute_name: "category_id",
            attribute_value: "PZHEDRPISOZX53HNMKTS6XLV"
          }
        }
      })
    });

    if (!response.ok) {
      const message = await response.text();
      console.error(`Square hero image request failed: ${response.status} ${message}`);
      return res.status(502).json({ error: "Failed to fetch hero images" });
    }
    
    const data = await response.json();
    const images = (data.related_objects || [])
      .filter(el=>el.type==="IMAGE")
      .map(img=>img.image_data)
      .filter(Boolean);

    res.json(images);
  } catch (err) {
    console.error("getHeroImages error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
