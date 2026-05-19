import React,{ useEffect, useState } from 'react';
import { Link, useParams, useMatch } from 'react-router-dom';

import LoadingBars from './collectionList/LoadingBars';
import MailIcon from '../Icons/MailIcon';
import ShoppingBagIcon from '../Icons/ShoppingBagIcon';
import InstaIcon from '../Icons/InstaIcon';


export default function Header({isLoading, appContext, setCartOpen}) {

  const { collectionSlug } = useParams(); 

  const isHome = useMatch({ path: "/", end: true });
  const isProduct = useMatch("/product/:id");
  const isCollection = useMatch("/collection/:id");
  const isSuccess = useMatch("/success");

  const basicHeader = isProduct || isSuccess;


  const collectionName = isCollection
    ? appContext.collections.find(item=>item.slug===collectionSlug)?.name
    :''
  const collectionImage = isCollection
    ? appContext.collections.find(item=>item.slug===collectionSlug)?.imageUrl
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
          ${isLoading ? 'text-gray-700' : basicHeader?'text-gray-700':'text-white'} 
          ${basicHeader ? 'h-28 bg-stone-100' : 'h-96 bg-stone-50'}  
          flex justify-between mb-6 rounded`}

        style={{ backgroundImage: `url(${basicHeader?'':heroUrl})` }}
        
      >
        {isLoading 
          ? !basicHeader && <LoadingBars />
          : !basicHeader && <div 
              className="absolute inset-0 bg-linear-to-b from-black/30 to-transparent"
            >
              <p className=" flex h-96 justify-center items-center text-3xl uppercase font-light text-white">{collectionName}</p>
            </div>
        }

        <div className={` p-8 z-10`}>
          <Link className="flex items-end bg-black/0  rounded" to="/">
            <svg
              width="50"
              viewBox="0 0 113 123"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2V56.5848H50.2977M61.313 2H113M61.313 29.8551H113M61.313 56.5848H113M2 122.987V90.2364C2 60.6646 57.3588 61.6494 57.3588 90.2364V122.987M107.916 68.3891V123"
                stroke="currentColor"
                strokeWidth="4"
              />
            </svg>

            <div className="font-raleway font-light uppercase text-xl ml-4 -mb-1.5 ">
              Visual art
            </div>
          </Link>
        </div>

        <div
          className={`flex pt-4 pr-6 z-10 `}
        >
          <div className="mt-1 mr-2.5">
            <InstaIcon className={`${iconHoverClass} hover:scale-110 cursor-pointer`} />
          </div>

          <div className="mt-1 mr-2.5">
            <MailIcon className={`${iconHoverClass} hover:scale-110 cursor-pointer`} />
          </div>

          <div
            className='cursor-pointer'
            onClick={() => setCartOpen(true)}>
            <ShoppingBagIcon 
              className={`${iconHoverClass} hover:scale-110`} 
              
            />
          </div>
        </div>
      </div>
    </>
  );
}
