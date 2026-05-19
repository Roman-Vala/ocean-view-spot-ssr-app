import React,{ useEffect, useState } from 'react';
import { useOutletContext } from "react-router-dom";

import LoadingBars from './LoadingBars';
import RectangleStack from '../../Icons/RectangleStack';
import CollectionCard from './CollectionCard';



export default function CollectionsList() {

  const { appContext } = useOutletContext();
  

  return (
    <div className='mb-6'>
      <div className="mb-1 flex items-center text-gray-800">
        <RectangleStack className={'mr-1'}/>
        <div className='uppercase text-sm'>Curated Art Collections</div>
        
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
        {appContext.collections.map((item) => <CollectionCard key={item.id} item={item} loadingCollections={appContext.isLoading}/>)}
      </div>
    </div>
  )
}
