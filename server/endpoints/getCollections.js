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
  
  // paralell requests here, one to types category one to types Item 
  const [collections, collectionsItems] = await Promise.all([
    squareFetch("/v2/catalog/search", {
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
    }),

    squareFetch("/v2/catalog/search", {
      body: {
        object_types: ['ITEM'],
        include_related_objects: true,
        include_category_path_to_root: true,
        query: {
          exact_query: {
            attribute_name: "category_id",
            attribute_value: collectionsCatId
          }
        },
      }
    }),
      

    
  ]);
  
  const collectionsIds = collections.objects.map(el=>el.id)
  // console.log(collectionsIds);

  const additionalColImages = 
    collectionsItems.related_objects?.filter(el=>el.type==='IMAGE');
  
  // Build image lookup map
  const imageMap = (additionalColImages || []).reduce((acc, img) => {
    acc[img.id] = img.image_data?.url;
    return acc;
  }, {});


  // Build lookup map
  const colAdditionalDataMap = (collectionsItems.objects || []).reduce((acc, el) => {
    const colItem = el.item_data;
    const rootCatId = colItem.reporting_category.id;
    const catId = colItem.categories.find(elm=>elm.id!==rootCatId)?.id;
    const catImages = colItem.image_ids.map(imgId=>imageMap[imgId]);

    if(catId){
      acc[catId] = {
        seoTitle: colItem.buyer_facing_name,
        seoDescription:colItem.description,
        images:catImages
      };
    }
    
    return acc;
  }, {});

  // console.log(colAdditionalDataMap);

  const enhancedCollections = collections.objects
    ? collections.objects.map(el=>{

        const categoryImages = el.category_data.image_ids?.map(imgId=>{
          return collections.related_objects.find(elm=>elm.id===imgId)
        })

        return {
          // ...el,
          id:el.id,
          name:el.category_data.name,
          imageUrl: categoryImages?categoryImages[0].image_data.url:'',
          slug: `${slugifyText(el.category_data.name)}-${el.id}`,
          products:[],
          categoryImages: colAdditionalDataMap[el.id]?.images || [],
          seoTitle: colAdditionalDataMap[el.id]?.seoTitle || '',
          seoDescription: colAdditionalDataMap[el.id]?.seoDescription || '',
        }
      })
    : [];

    // console.log(enhancedCollections);

  res.setHeader("ETag", etag);
  res.json(enhancedCollections);
};