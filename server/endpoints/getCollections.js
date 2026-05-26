import crypto from 'crypto';
import { slugifyText } from '../../utils/slugifyText.js';
import { squareFetch } from '../server-utils/squareFetch.js';

export default async function getCollections(req, res, next) { 

  const colObjResponseData = await squareFetch('/v2/catalog/search',{
    body:{
      object_types: ['CATEGORY'],
      include_related_objects: true,
      include_category_path_to_root: true,
      query: {
        exact_query: {
          attribute_name: "name",
          attribute_value: "collections"
        }
      }
    }
  })

  const versionString = colObjResponseData.latest_time;
  const etag = crypto.createHash("sha1").update(versionString).digest("hex");
  const clientETag = req.headers["if-none-match"];

  if (clientETag === etag) {
    return res.status(304).end();
  }

  const collectionsCatId = colObjResponseData.objects[0].id; 
  
  const collections = await squareFetch("/v2/catalog/search", {
      body: {
        object_types: ['CATEGORY'],
        include_related_objects: true,
        include_category_path_to_root: true,
        query: {
          exact_query: {
            attribute_name: "root_category",
            attribute_value: collectionsCatId
          }
        }
      }
    });

  const enhancedCollections = collections.objects
    ? collections.objects.map(el=>{

        const categoryImages = el.category_data.image_ids?.map(imgId=>{
          return collections.related_objects.find(elm=>elm.id===imgId)
        });
        
        return {
          // ...el,
          id: el.id,
          name: el.category_data.name,
          imageUrl: categoryImages?categoryImages[0].image_data.url:'',
          slug: `${slugifyText(el.category_data.name)}-${el.id}`,
          products:[],
          // categoryImages: colAdditionalDataMap[el.id]?.images || [],
          seoTitle: el.category_data.ecom_seo_data?.page_title || el.category_data.name,
          seoDescription: el.category_data.ecom_seo_data?.page_description || '',
        }
      })
    : [];

    // console.log(enhancedCollections);

  res.setHeader("ETag", etag);
  res.json(enhancedCollections);
};