import crypto from 'crypto';
import {slugifyText} from '../../utils/slugifyText.js';


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

  const items = data.objects || [];
  const variationIds = items.flatMap(item =>
    (item.item_data?.variations ?? []).map(variation => variation.id)
  );
  // console.log(variationIds);

  const inventoryResp = await fetch('https://connect.squareup.com/v2/inventory/counts/batch-retrieve', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      catalog_object_ids: variationIds,
      // location_ids: [LOCATION_ID]
    })
  });

  const inventoryData = await inventoryResp.json()

  const responseImages = data.related_objects?.filter(el=>el.type==="IMAGE");

  // 4️ Build lookup maps
  const imageMap = {};
  for (const img of responseImages || []) {
    imageMap[img.id] = img.image_data?.url;
  }

  const inventoryMap = {};
  for (const c of inventoryData.counts || []) {
    inventoryMap[c.catalog_object_id] = c.quantity;
  }

  // console.log(inventoryMap);

  // 5️ Flatten response
  const itemsData = items.map(item => {
    const variation = item.item_data.variations?.[0]; // simple case: first variation
    const customAttributes = Object.values(item?.custom_attribute_values || {});
    const slug = customAttributes.find(el=>el.name==="slug");
    const headline = customAttributes.find(el=>el.name==="headline");
    
    return {
      id: item.id,
      itemId:item.id,
      name: item.item_data?.name,
      description: item.item_data?.description_html,
      categoryId: item.item_data?.reporting_category?.id,
      headline: headline?.string_value,
      slug: slug
        ? slug.string_value
        : slugifyText(item.item_data?.name),

      item,

      price:
        variation?.item_variation_data?.price_money?.amount ?? null,

      currency:
        variation?.item_variation_data?.price_money?.currency ?? null,

      imageUrl:
        item.item_data.image_ids?.length > 0
          ? imageMap[item.item_data.image_ids[0]]
          : null,

      images: item.item_data.image_ids?.map(imgId=>imageMap[imgId]) || [],

      stockLevel:
        variation?.id
          ? inventoryMap[variation.id] ?? null
          : null
    };
  });  

  
  res.setHeader("ETag", etag);
  res.json(itemsData);
}