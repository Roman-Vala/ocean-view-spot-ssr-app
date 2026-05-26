import React from 'react';
import { Helmet } from "react-helmet-async";

import { useParams, useOutletContext } from "react-router-dom";
import ProductList from '../../components/productList/ProductList';
import CollectionsList from '../../components/collectionList/CollectionsList';
import RecentProducts from '../../components/productList/RecentProducts';


export default function Collection() {

  const { collectionSlug } = useParams();  
  const { appContext } = useOutletContext();

  const collection = appContext.collections.find(el=>el.slug===collectionSlug);
  // console.log(collection);

  return (
    <>
    <Helmet>

        <title>{collection?.seoTitle || collection?.name}</title>
        <meta
          name="description"
          content={collection.seoDescription || ''}
        />

        <meta
          property="og:title"
          content={collection?.seoTitle || collection?.name}
        />
        <meta
          property="og:description"
          content={collection.seoDescription || ''}
        />

        <meta
          name="twitter:title"
          content={collection?.seoTitle || collection?.name}
        />
        <meta
          name="twitter:description"
          content={collection.seoDescription || ''}
        />
      </Helmet>

      {collection && <ProductList categoryId={collection.id}/>} 

      <CollectionsList/>
      <RecentProducts/>

    </>
  )
}
