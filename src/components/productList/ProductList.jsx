import React ,{ useEffect, useState } from 'react';
import { useOutletContext } from "react-router-dom";

import LoadingBars from '../collectionList/LoadingBars';
import ProductCard from './ProductCard';

const productsPlaceholders = [
  {
    id: 1,
    name: "",
    description: "...",
    price: 0,
    image: "",
  },
  {
    id: 2,
    name: "",
    description: "...",
    price: 0,
    image: "",
  },
  {
    id: 3,
    name: "",
    description: "...",
    price: 0,
    image: "",
  },
];

export default function ProductList({categoryId, tag}) {

  // console.log(categoryId, tag);
  const { appContext:{
    productFetchIteration, 
    latestProducts,
    collections,
    collectionsETag,
    latestProductsETag
  }, setAppContext} = useOutletContext();

  const productETag = categoryId ? collectionsETag : latestProductsETag;

  const cachedProducts = categoryId
    ? collections.find(el=>el.id === categoryId).products || []
    : latestProducts;

  const initialProductsData = cachedProducts.length
      ? cachedProducts
      : productsPlaceholders

  const initialLoadingState = cachedProducts.length ? false : true;

  // console.log({cachedProducts});

  const [productsData, setProductsData] = useState(initialProductsData);
  const [loadingProducts, setLoadingProducts] = useState(initialLoadingState);


  // console.log(productFetchIteration);

  const params = new URLSearchParams();

  if (categoryId) params.append('categoryId', categoryId);
  if (tag) params.append('tag', tag);

  const query = params.toString();

  const itemsUrl =  query ? `/api/items?${query}` : '/api/items';

  
  useEffect(() => {
    const controller = new AbortController();
    const fetchProductsData = async () => {
      // console.log('fetching data');
      try {
        const res = await fetch(itemsUrl, {
          signal: controller.signal,
          headers: cachedProducts.length && productETag
            ? {"If-None-Match": productETag}
            : {}
        });

        if (res.status === 304) {
          // console.log('304');
          setProductsData(cachedProducts);
          setLoadingProducts(false);

          return;
        }

        const etag = res.headers.get("ETag");
        const data = await res.json();

        setProductsData(data);
        setLoadingProducts(false);
        setAppContext(oldCtx=>{
          const updatedCollections = oldCtx.collections.map(col =>
            col.id === categoryId
              ? { ...col, products: data }
              : col
          );

          // console.log(oldCtx.productCache,data);
          // TODO: the above do not match
          const cachedProductsSet = new Set(oldCtx.productCache);
          const updatedProductCacheSet = new Set([...cachedProductsSet, ...data]);
          const updatedProductCache = [...updatedProductCacheSet];
          
          return {
            ...oldCtx,
            ...(categoryId
                ?{collections:updatedCollections, collectionsETag:etag}
                :{latestProducts:data, latestProductsETag:etag}
              ),
            productCache:updatedProductCache
          }
        })
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      }
    };

    fetchProductsData();

    return () => {
      controller.abort();
    };
  }, [productFetchIteration]);

  return (
    <div className="max-w-7xl mx-auto ">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {productsData.map(product => (
          <ProductCard 
            product={product} 
            loadingProducts={loadingProducts}
            key={product.id}/>
        ))}
      </div>
    </div>
  );
}