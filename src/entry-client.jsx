import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from './components/ScrollToTop';

import App from './App'
import './styles.css'
import Collection from './pages/Collection/Collection';
import Contact from './pages/Contact/Contact';
import Home from './pages/Home/Home'
import ProductPage from './pages/Product/Product';
import OrderSuccessPage from './pages/Order/OrderSuccessPage';

const initialDataElement =
  document.getElementById("__INITIAL_DATA__");

const initialData = initialDataElement
  ? JSON.parse(initialDataElement.textContent)
  : null;

ReactDOM.hydrateRoot(
  document.getElementById('root'),
  <HelmetProvider>
    <BrowserRouter>
      <ScrollToTop/>
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
    </BrowserRouter>
  </HelmetProvider>
)