import { squareFetch } from '../server-utils/squareFetch.js';

export default async function getHeroImages(req, res, next) { 

  try {

    const [shopfrontImagesCategory, textOverlayOptionsObjects] = await Promise.all([
      squareFetch("/v2/catalog/search", {
        body: {
          object_types: ['CATEGORY'],
          include_related_objects: true,
          include_category_path_to_root: true,
          query: {
            exact_query: {
              attribute_name: "name",
              attribute_value: "shopfront images"
            }
          }
        }
      }),
        
  
      squareFetch("/v2/catalog/search", {
        body: {
          object_types: ["CUSTOM_ATTRIBUTE_DEFINITION"],
          query: {
            exact_query: {
              attribute_name: "name",
              attribute_value: "text-overlay"
            }
          }
        }          
      })
        
    ]);
    
    const textOverlayOptions = textOverlayOptionsObjects.objects?.[0].custom_attribute_definition_data.selection_config.allowed_selections || [];

    const textOverlayOptionsMap = textOverlayOptions.reduce((map, opt) => {
      map[opt.uid] = opt.name;
      return map;
    }, {});
    

    const shopfrontImagesId = shopfrontImagesCategory.objects?.[0].id;

    const shopfrontImagesItems = shopfrontImagesId && await squareFetch('/v2/catalog/search',{
      body:{
        object_types: ['ITEM'],
        include_related_objects: true,
        include_category_path_to_root: true,
        query: {
          exact_query: {
            attribute_name: "category_id",
            attribute_value: shopfrontImagesId
          }
        }
      }
    });

    const sortedShopfrontImages = shopfrontImagesItems?.objects
      .toSorted((a, b) => {
        const getPriority = (item) => {
          const attr = Object.values(item.custom_attribute_values ?? {})
            .find((value) => value.name === 'priority');
      
          return attr?.number_value == null ? Infinity : Number(attr.number_value);
        };
      
        return getPriority(a) - getPriority(b);
      })
      .flatMap((item) => {
        const textOverlayAttr = 
          Object.values(item.custom_attribute_values ?? {}).find(
            (value) => value.name === 'text-overlay'
          );

        const textOverlay = textOverlayAttr
          ? textOverlayOptionsMap[textOverlayAttr.selection_uid_values[0]]
          : "dark";

        return (item.item_data?.image_ids ?? []).map(el=>({
          id:el,
          textOverlay
        }))
      
      }) || [];

    const images = (shopfrontImagesItems?.related_objects || [])
      .filter(el=>el.type==="IMAGE")
      .filter(Boolean);

    const imageMap = images.reduce((map, img) => {
      map[img.id] = {url:img.image_data?.url};
      return map;
    }, {});

    const enhancedImages = sortedShopfrontImages.map(el=>({...imageMap[el.id],textOverlay:el.textOverlay}))


    res.json(enhancedImages);
  } catch (err) {
    console.error("getHeroImages error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
