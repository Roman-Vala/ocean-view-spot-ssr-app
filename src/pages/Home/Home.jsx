import React from 'react';
import { useOutletContext } from "react-router-dom";

import { Helmet } from "react-helmet-async";

import CollectionsList from '../../components/collectionList/CollectionsList';
import RecentProducts from '../../components/productList/RecentProducts';

export default function Home() {
  const { appContext } = useOutletContext();

  return (
    <>
      <Helmet key='home' defer={false}>
        <title>{appContext.metaTitle}</title>

        <meta
          name="description"
          content={appContext.metaDescription}
        />

        <meta
          property="og:title"
          content={appContext.metaTitle}
        />
      </Helmet>
      
      <CollectionsList/>
      <RecentProducts/>     

    </>
  )
}
