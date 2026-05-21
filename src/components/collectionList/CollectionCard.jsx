import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import LoadingBars from './LoadingBars';

export default function CollectionCard({item, loadingCollections}) {

  return (
    <div
      className="group relative rounded overflow-hidden transition text-white bg-stone-50"
      style={{
        backgroundImage: `url(${item.imageUrl || ''})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      {loadingCollections ? (
        <LoadingBars width={10}/>
      ) : (
        <div className="absolute inset-0 bg-linear-to-b from-black/40  to-black/0" />
      )}

      {/* Content */}
      <Link 
        className="relative px-5 py-3 flex flex-col h-40 text-sm  cursor-pointer font-semibold"
        to={`/collection/${item.slug}`}
      >
        <h3 className=" mb-2 uppercase">{item.name}</h3>

        {/* Hover Content */}
        {!loadingCollections && <div className="absolute inset-0 flex items-center justify-center z-10
             opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0
             transition duration-300 ease-out will-change-transform">
          <div className="text-center text-white px-4">
            <p className="mt-3 text-sm border border-white py-2 px-4 rounded">
              View Collection
            </p>
            
          </div>
        </div>}
      </Link>
    </div>
  );
}
