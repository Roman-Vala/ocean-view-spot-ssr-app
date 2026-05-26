import React from 'react';
import { useOutletContext } from "react-router-dom";

import { Helmet } from "react-helmet-async";

import CollectionsList from '../../components/collectionList/CollectionsList';
import RecentProducts from '../../components/productList/RecentProducts';

export default function Home() {
  const { appContext } = useOutletContext();

  return (
    <>
      <Helmet >
        <title>{appContext.metaTitle}</title>

        <meta
          name="description"
          content={appContext.metaDescription}
        />

        <meta
          property="og:title"
          content={appContext.metaTitle}
        />
        <meta
          property="og:description"
          content={appContext.metaDescription}
        />

        <meta
          name="twitter:title"
          content={appContext.metaTitle}
        />
        <meta
          name="twitter:description"
          content={appContext.metaDescription}
        />
      </Helmet>
      
      <CollectionsList/>
      <RecentProducts/>     

    </>
  )
}
