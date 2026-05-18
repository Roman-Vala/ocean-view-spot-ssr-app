import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';

import LoadingBars from '../collectionList/LoadingBars';
import { formatCurrency } from '../../utils/formatCurrency';

export default function ProductCard({product, loadingProducts}) {

  const { appContext,setAppContext } = useOutletContext();

  const addToCart = (item) => {
    const existingItem = appContext.cart.find((cartItem) => cartItem.id === item.id);
    setAppContext({
      ...appContext,
      ...( existingItem?{cart:[...appContext.cart]}:{cart:[...appContext.cart, item]} ),
      isCartOpen: true
    })
  };


  

  return (
    <div
      key={product.id}
      className=" relative bg-stone-100 rounded shadow  transition overflow-hidden"
    >
      <div className="group">
        <div className="relative h-56 overflow-hidden bg-stone-100">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full" />
          )}
        </div>

        {/* Overlay */}
        {loadingProducts ? (
          <LoadingBars width={10} />
        ) : (
          <div className="absolute inset-0 h-56 p-4 bg-gradient-to-b from-black/40  to-black/0 ">
            <p className=" text-sm uppercase font-semibold text-white">{product.name}</p>
          </div>
        )}

        {/* Hover Content */}
        {!loadingProducts && <Link
          className="absolute inset-0 h-56 flex items-center justify-center z-10
              opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0
              transition duration-300 ease-out will-change-transform cursor-pointer"
          to={`/product/${product.slug}-${product.id}`}
        >
          <div className="text-center text-white px-0">
            <p className=" text-sm border border-white py-2 px-4 rounded">
              Explore Details
            </p>
          </div>
        </Link>}

      </div>

      <div className="p-3 flex flex-col">
        {/* <h3 className="text-base font-semibold mb-0">{product.name}</h3> */}

        <p className="text-sm text-gray-600 mb-2">{product.headline}</p>

        <div className="flex items-center justify-between">
          {product.stockLevel >= 1
            ? <span className="text-lg font-bold">{formatCurrency(product.price)}</span>
            : <span className="text-stone-700 font-normal ">
                {loadingProducts?'':'SOLD'}
              </span>
          }
          

          {product.stockLevel >= 1 && 
            <button 
              className=" text-gray-600 text-xs px-2.5 py-2 border border-stone-400 rounded hover:shadow-md transition uppercase font-semibold"
              // onClick={handleBuyNow}
              onClick={()=>addToCart(product.item)}
            >
              Buy Now
            </button>
          }
        </div>
      </div>
    </div>
  );
}
