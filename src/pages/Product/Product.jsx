import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import ProductImageGallery from './ProductImageGallery';
import { formatCurrency } from '../../utils/formatCurrency';
import ShoppingBagIcon from '../../Icons/ShoppingBagIcon';
import ProductInfoSkeleton from './ProductInfoSkeleton';
import LoadingBar from '../../Icons/LoadingBar';
import CollectionsList from '../../components/collectionList/CollectionsList';
import RecentProducts from '../../components/productList/RecentProducts';


export default function ProductPage() {
  const { productSlug } = useParams(); 
  const segmentArray = productSlug.split('-');
  const productId = segmentArray[segmentArray.length-1];

  const { appContext, setAppContext } = useOutletContext();

  const productETag = appContext.productETag;
  const cachedProduct = appContext.productCache.find(el=>el.itemId===productId);

  // console.log(productETag, cachedProduct);

  const [product, setProduct] = useState(cachedProduct || {});
  const [isLoading, setIsLoading] = useState(cachedProduct ? false : true);
  const [isCheckoutLoading, setCheckoutLoading] = useState(false);

  const inventoryCount = product.item?.item_data.variations[0].inventoryCount?.toString();
  const isAvailable = product.item?.item_data.variations[0].inventoryCount >= 1;

  const productName = product.item?.item_data.name || '';
  const productDescription = product.item?.item_data.description || '';

  const seoTitle = product.item?.item_data.ecom_seo_data?.page_title;
  const seoDescription = product.item?.item_data.ecom_seo_data?.page_description;

  // console.log({seoTitl, seoDesc});
  // console.log(product);

  const addToCart = (item) => {
    const existingItem = appContext.cart.find((cartItem) => cartItem.id === item.id);
    setAppContext({
      ...appContext,
      ...( existingItem?{cart:[...appContext.cart]}:{cart:[...appContext.cart, item]} ),
      isCartOpen: true
    })
  };  

  useEffect(() => {
    const controller = new AbortController();

    const fetchItemData = async () => {
      // console.log('fetching data');
      setIsLoading(true);
      try {
        const res = await fetch(`/api/items/${productId}`, { 
          signal: controller.signal,
          headers: cachedProduct && inventoryCount && productETag
            ? {"If-None-Match": productETag}
            : {}
        });

        if (res.status === 304) {
          // console.log('304');
          setProduct(cachedProduct);
          setIsLoading(false);

          return;
        }

        const etag = res.headers.get("ETag");
        const productData = await res.json();
        // console.log(productData)
        setProduct(productData);
        setIsLoading(false);
        setAppContext(oldCtx=>{
          const cachedItem = oldCtx.productCache.find(item =>item.itemId===productId)
          const updatedProductCache = cachedItem
              ? oldCtx.productCache.map(el=>el.itemId===productId?productData:el)
              : [...oldCtx.productCache, productData]
          ;
          
          return {
            ...oldCtx,
            productCache:updatedProductCache,
            productETag:etag
          }
        })

      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      }
    };
    fetchItemData();
    return () => {
      controller.abort();
    };
  }, [appContext.productFetchIteration, productSlug, inventoryCount]);


  return (
    <>

      <Helmet >

        <title>{ seoTitle || productName }</title>
        <meta
          name="description"
          content={seoDescription || productDescription}
        />

        <meta
          property="og:title"
          content={ seoTitle || productName }
        />
        <meta
          property="og:description"
          content={seoDescription || productDescription}
        />

        <meta
          name="twitter:title"
          content={ seoTitle || productName }
        />
        <meta
          name="twitter:description"
          content={seoDescription || productDescription}
        />

      </Helmet>

      
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-12 mb-8">
        <div className="col-span-6">
          <ProductImageGallery images={product?.images || []} />
        </div>
        {/* Product Info */}
        {isLoading ? (
          <ProductInfoSkeleton />
        ) : (
          <div className="flex flex-col gap-4 col-span-6">
            <h1 className="text-3xl font-semibold">{productName}</h1>
            <p className="text-2xl font-medium text-gray-700">
              {inventoryCount
                ? isAvailable
                  ? <span>{formatCurrency(
                      product.item?.item_data.variations[0].item_variation_data.price_money.amount
                    )}</span>

                  : <span className="text-stone-500 font-normal px-3 py-1.5 border rounded">
                      SOLD
                    </span>
                : <span><LoadingBar/></span>
              }
              
            </p>

            <p className="text-gray-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product.item?.item_data.description_html }}
            >
              
            </p>

            {/* Actions */}
            {isAvailable && <div className="flex gap-4 mt-4">
              <button 
                className="flex justify-center items-center bg-stone-900 text-white w-40 px-8 py-3 rounded hover:opacity-90 transition cursor-pointer"
                onClick={()=>addToCart(product.item)}
              >
                {isCheckoutLoading
                  ? <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  : <span>Buy Now</span>
                }
              </button>
              <button 
                className=" flex gap-3 items-center border border-gray-500 pl-5 pr-6 py-3 rounded hover:bg-gray-100 transition cursor-pointer"
                onClick={()=>addToCart(product.item)}
              >
                <ShoppingBagIcon />
                <span>Add to Cart</span>
              </button>
            </div>}
          </div>
        )}

      </div>
      <CollectionsList/>
      <RecentProducts/>    
    </>

  );
}
