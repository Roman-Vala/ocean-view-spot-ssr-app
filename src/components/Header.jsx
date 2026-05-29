import React,{ useEffect, useState } from 'react';
import { Link, useParams, useMatch } from 'react-router-dom';

import LoadingBars from './collectionList/LoadingBars';
import MailIcon from '../Icons/MailIcon';
import ShoppingBagIcon from '../Icons/ShoppingBagIcon';
import InstaIcon from '../Icons/InstaIcon';
import SvgLogo from '../Icons/SvgLogo';


export default function Header({isLoading, appContext, setCartOpen}) {

  const { collectionSlug } = useParams(); 

  const isHome = useMatch({ path: "/", end: true });
  const isProduct = useMatch("/product/:id");
  const isCollection = useMatch("/collection/:id");
  const isSuccess = useMatch("/success");

  // const basicHeader = isProduct || isSuccess;
  const basicHeader = true;

  const collection = appContext.collections.find(item=>item.slug===collectionSlug);

  const collectionName = isCollection
    ? collection?.name
    :''
  const collectionImage = isCollection
    ? collection?.imageUrl || appContext.initialHeroImages?.[0].url
    :''

  const iconHoverClass = basicHeader
    ? 'hover:text-gray-500'
    : 'hover:text-gray-100'

  const resolvedHeroUrl = isHome
    ? appContext.initialHeroImages.length? appContext.initialHeroImages[0].url : ''
    : collectionImage

  const [heroUrl,setHeroUrl] = useState(resolvedHeroUrl);

  useEffect(() => {
    setHeroUrl(resolvedHeroUrl)
    
  }, [resolvedHeroUrl])
  
  

  
  return (
    <>
      <div
        className={`relative mt-8 bg-cover bg-center 
          ${isLoading ? "text-gray-700" : basicHeader ? "text-gray-700" : "text-white"} 
          ${basicHeader ? "h-28" : "h-96 bg-stone-50"}  
          flex justify-between mb-6 rounded`}
        style={{ backgroundImage: `url(${basicHeader ? "" : heroUrl})` }}
      >
        <div className="absolute inset-0 ">
          <p className=" flex h-20 justify-center items-center text-stone-700 text-md capitalize">
            {collectionName}
          </p>
        </div>

        <div className={`z-10`}>
          <Link className="flex" to="/">
            <SvgLogo className="w-40 h-20" />
          </Link>
        </div>

        <div className={`flex pt-1 z-10 `}>
          <div className="mt-1 mr-2.5">
            <InstaIcon className={`${iconHoverClass} hover:scale-110 cursor-pointer`} />
          </div>

          <div className="mt-1 mr-2.5">
            <MailIcon className={`${iconHoverClass} hover:scale-110 cursor-pointer`} />
          </div>

          <div className="cursor-pointer" onClick={() => setCartOpen(true)}>
            <ShoppingBagIcon className={`${iconHoverClass} hover:scale-110`} />
          </div>
        </div>
      </div>
    </>
  );
}
