import crypto from 'crypto';
import {slugifyText} from '../../utils/slugifyText.js';

const SQUARE_BASE_URL = "https://connect.squareup.com";
const SQUARE_TOKEN = process.env.SQUARE_ACCESS_TOKEN;

//id for custom attribute "tag"
const tagId = 'XIZMWM7V473IMDCBPE2YIQWD'

// helper for Square requests
async function squareFetch(path, body) {
  const res = await fetch(`${SQUARE_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${SQUARE_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Square API error: ${text}`);
  }
  return res.json();
};

export default async function getItemsByCategoryOrTag(req, res, next) {

  const { categoryId, tag } = req.query;

  // 0 get catalog latest time to calculate ETag

  const catResp = await squareFetch(
    "/v2/catalog/search",
    {object_types: ['TAX'],limit:1}
  );
  const versionString = catResp.latest_time;
  const etag = crypto.createHash("sha1").update(versionString).digest("hex");
  const clientETag = req.headers["if-none-match"];

  if (clientETag === etag) {
    return res.status(304).end();
  }

   
  // 1️ Search catalog items
  const searchBody = {
    limit: 100,
    ...(categoryId && { category_ids: [categoryId] }),
    ...(tagId && tag && {
      custom_attribute_filters: [
        {
          custom_attribute_definition_id: tagId,
          string_filter: tag      
        }
      ]
    })
  };

  const itemsResp = await squareFetch(
    "/v2/catalog/search-catalog-items",
    searchBody
  );
  // console.log(itemsResp);
  
  const items = itemsResp.items || [];
  const variationIds = itemsResp.matched_variation_ids || [];

  // 2️ Collect img IDs
  const imageIds = new Set();

  for (const item of items) {
    if (item.item_data.image_ids) {
      item.item_data.image_ids.forEach(id => imageIds.add(id));
    }
  }
  // 3️ Fetch images + inventory in parallel
  const [imagesResp, inventoryResp] = await Promise.all([
    imageIds.size
      ? squareFetch("/v2/catalog/batch-retrieve", {
          object_ids: Array.from(imageIds)
        })
      : Promise.resolve({ objects: [] }),

    variationIds.length
      ? squareFetch("/v2/inventory/counts/batch-retrieve", {
          catalog_object_ids: variationIds,
          // location_ids: [LOCATION_ID]
        })
      : Promise.resolve({ counts: [] })
  ]);

  // console.log({imagesResp, inventoryResp});

  // 4️ Build lookup maps
  const imageMap = {};
  for (const img of imagesResp.objects || []) {
    imageMap[img.id] = img.image_data?.url;
  }

  // console.log(imageMap);

  const inventoryMap = {};
  for (const c of inventoryResp.counts || []) {
    inventoryMap[c.catalog_object_id] = c.quantity;
  }

  // 5️ Flatten response
  const itemsData = items.map(item => {
    const variation = item.item_data.variations?.[0]; // simple case: first variation
    const customAttributes = Object.values(item?.custom_attribute_values);
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

      images: item.item_data.image_ids.map(imgId=>imageMap[imgId]),

      stockLevel:
        variation?.id
          ? inventoryMap[variation.id] ?? null
          : null
    };
  });  
  
  res.setHeader("ETag", etag);
  res.json(itemsData);
}