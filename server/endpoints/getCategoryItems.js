import crypto from 'crypto';

export default async function getCategoryItems(req, res, next) { 

  const { categoryId } = req.params;

  const query = categoryId
    ? {
        query: {
          exact_query: {
            attribute_name: "category_id",
            attribute_value: categoryId,
          },
        },
      }
    : {};

   

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
      ...query,
    })
  });
  
  const data = await response.json();
  // console.log(data);
  const versionString = data.latest_time;
  const etag = crypto.createHash("sha1").update(versionString).digest("hex");
  const clientETag = req.headers["if-none-match"];

  if (clientETag === etag) {
    return res.status(304).end();
  }
  // console.log(etag);
  
  res.setHeader("ETag", etag);
  res.json(data);
}