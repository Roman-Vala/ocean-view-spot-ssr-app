import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './App';
import Collection from './pages/Collection/Collection';
import Contact from './pages/Contact/Contact';
import Home from './pages/Home/Home'
import ProductPage from './pages/Product/Product';
import OrderSuccessPage from './pages/Order/OrderSuccessPage';

function getApiBaseUrl(req) {
  if (process.env.API_BASE_URL) {
    return process.env.API_BASE_URL;
  }
  const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'http';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  return `${protocol}://${host}`;
}

async function fetchJson(req, path) {
  const apiBaseUrl = getApiBaseUrl(req);
  const response = await fetch(`${apiBaseUrl}${path}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch ${apiBaseUrl}${path}: ${response.status}`);
  }

  return response.json();
}


async function getHomeData(req) {
  const [heroData, collectionsData, siteMetaData] = await Promise.all([
    fetchJson(req, '/api/hero'),
    fetchJson(req, '/api/collections'),
    fetchJson(req, '/api/site-meta')
  ]);

  return {

    metaTitle: siteMetaData.location.name,
    metaDescription: siteMetaData.location.description,
    heroImages:heroData,
    initialHeroImages:heroData,
    collections:collectionsData,
    isLoading:false,
    isCartOpen:false,
    cart:[],
    productFetchIteration:1,
    latestProducts:[],
    productCache:[]
  };
}

async function getProductData(req,productSlug) {
  const segmentArray = productSlug.split('-');
  const productId = segmentArray[segmentArray.length-1];
  const product = await fetchJson(req, `/api/items/${productId}`);
  const homeData = await getHomeData(req);


  return {
    ...homeData,
    productCache:[product]
  };
}

async function getCollectionProducts(req,collectionSlug) {
    const segmentArray = collectionSlug.split('-');
    const collectionId = segmentArray[segmentArray.length-1];
    const collectionProducts = await fetchJson(req, `/api/items?categoryId=${collectionId}`);

    const homeData = await getHomeData(req);
    const updatedCollections = homeData.collections.map(col =>
      col.id === collectionId
        ? { ...col, products: collectionProducts }
        : col
    );
  
  return {
    ...homeData,
    collections:updatedCollections
  };
}

async function getInitialData(url, req) {
  const pathname = url.split('?')[0];

  const productMatch = matchPath(
    { path: '/product/:productSlug' },
    pathname
  );
  if (productMatch) {
    return getProductData(req, productMatch.params.productSlug);
  }

  const collectionMatch = matchPath(
    { path: '/collection/:collectionSlug' },
    pathname
  );
  if (collectionMatch) {
    return getCollectionProducts(req, collectionMatch.params.collectionSlug)
  }

  return getHomeData(req);
}

export async function render(url,req) {
  const helmetContext = {};
  const initialData = await getInitialData(url,req);

  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <Routes>
          <Route path="/" element={<App initialData={initialData} />}>
            <Route index element={<Home />} />
            <Route path="collection/:collectionSlug" element={<Collection />} />
            <Route path="product/:productSlug" element={<ProductPage/>} />
            <Route path="contact" element={<Contact />} />
            <Route path="success" element={<OrderSuccessPage />} />
          </Route>
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </StaticRouter>
    </HelmetProvider>
  );

  return {
    appHtml,
    initialData,
    helmet: helmetContext.helmet || {}
  };
}
