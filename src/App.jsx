import React, { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";

import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/cartDrawer/CartDrawer';

import { loadCart, saveCart } from './utils/localStorageCartHelper';

const CART_KEY = "cart";

const collectionsPlaceholder = [
  {
    id:'1',
    name:'',
    imageUrl:null
  },
  {
    id:'2',
    name:'',
    imageUrl:null
  }
  ,{
    id:'3',
    name:'',
    imageUrl:null
  },
]

function App({initialData}) {
  
  const [appContext, setAppContext] = useState(initialData)

  const setCartOpen = (state) => setAppContext(oldCtx=>({
    ...oldCtx,
    isCartOpen: state
  }));

  const refreshProducts = () => setAppContext(oldCtx=>({
    ...oldCtx,
    productFetchIteration: appContext.productFetchIteration + 1,
  }));

  const setCart = (cart) => setAppContext(oldCtx=>({
    ...oldCtx,
    cart
  }));

  const removeFromCart = (itemIds) => {
    const idsToRemove = new Set(
      Array.isArray(itemIds) ? itemIds : [itemIds]
    );
  
    setAppContext(oldCtx=>({
      ...oldCtx,
      cart: appContext.cart.filter(el => !idsToRemove.has(el.id))
    }));
  };
  const clearCart = () => {    
    setAppContext(oldCtx=>({
      ...oldCtx,
      cart: []
    }));
  };
  
  

  useEffect(() => {
    const controller = new AbortController();  
    const fetchData = async () => {
      // console.log('fetching 123');
      try {
        const [heroRes, collectionsRes, siteMetaRes] = await Promise.all([
          fetch("/api/hero", { signal: controller.signal }),
          fetch("/api/collections", { signal: controller.signal }),
          fetch("/api/site-meta", { signal: controller.signal }),
        ]);  
        // optional: check both responses
        if (!heroRes.ok || !collectionsRes.ok) {
          throw new Error("One of the requests failed");
        }
  
        const [heroData, collectionsData, siteMetaData] = await Promise.all([
          heroRes.json(),
          collectionsRes.json(),
          siteMetaRes.json()
        ]);

        // console.log(collectionsData);

        setAppContext(oldCtx=>({
          ...oldCtx,
          metaTitle: siteMetaData.location.name,
          metaDescription: siteMetaData.location.description,
          heroImages:heroData,
          initialHeroImages:heroData,
          collections:collectionsData,
          isLoading:false,
        }))
  
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      }
    };
  
    fetchData();
  
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    setCart(loadCart(CART_KEY));
  }, []);

  useEffect(() => {
    saveCart(CART_KEY, appContext.cart);
  }, [appContext.cart]);

  //persist cart across tabs
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "cart") {
        setCart(loadCart(CART_KEY));
      }
    };  
    window.addEventListener("storage", handler);
  
    return () => {
      window.removeEventListener("storage", handler);
    };
  }, []);
  

  return (
    <div className="container mx-auto px-4 bg-white max-w-286.5">

      <Header 
        heroImages={appContext.heroImages} 
        initialHeroImages={appContext.initialHeroImages} 
        isLoading={appContext.isLoading}
        appContext={appContext}
        setCartOpen={setCartOpen}
      />
        <Outlet context={{ appContext, setAppContext }}/>
      <Footer/>

      <CartDrawer 
        isOpen={appContext.isCartOpen} 
        setIsOpen={setCartOpen}
        cart={appContext.cart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        refreshProducts={refreshProducts}
      />

    </div>
    
  )
}

export default App
