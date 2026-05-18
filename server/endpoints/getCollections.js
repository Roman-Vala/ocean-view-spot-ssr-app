import crypto from 'crypto';
import {slugifyText} from '../../utils/slugifyText.js';

export default async function getCollections(req, res, next) { 

  const colObjResponse = await fetch('https://connect.squareup.com/v2/catalog/search', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      object_types: ['CATEGORY'],
      include_related_objects: true,
      include_category_path_to_root: true,
      query: {
        exact_query: {
          attribute_name: "name",
          attribute_value: "collections"
        }
      },
    })
  });

  const colObjResponseData = await colObjResponse.json();

  const versionString = colObjResponseData.latest_time;
  const etag = crypto.createHash("sha1").update(versionString).digest("hex");
  const clientETag = req.headers["if-none-match"];

  if (clientETag === etag) {
    return res.status(304).end();
  }

  // console.log(etag, clientETag);

  // console.log(colObjResponseData.latest_time);

  const collectionsCatId = colObjResponseData.objects[0].id;
  

  const response = await fetch('https://connect.squareup.com/v2/catalog/search', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      object_types: ['CATEGORY'],
      include_related_objects: true,
      include_category_path_to_root: true,
      query: {
        exact_query: {
          attribute_name: "root_category",
          attribute_value: collectionsCatId
        }
      },
    })
  });
  
  const data = await response.json();

  const collectionsWithImages = data.objects
    ? data.objects.map(el=>{
        const categoryImages = el.category_data.image_ids?.map(imgId=>{
          return data.related_objects.find(elm=>elm.id===imgId)
        })
        return {
          // ...el,
          id:el.id,
          name:el.category_data.name,
          imageUrl: categoryImages?categoryImages[0].image_data.url:'',
          slug: `${slugifyText(el.category_data.name)}-${el.id}`,
          products:[]
          // categoryImages 
        }
      })
    : [];

  res.setHeader("ETag", etag);
  res.json(collectionsWithImages);
};