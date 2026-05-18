import React from 'react';
import BarsIcon from '../../Icons/BarsIcon';

export default function LoadingBars({width=20}) {

  return (
    <div className=" absolute inset-0 flex items-center justify-center animate-pulse">
      <div style={{width:`${width*0.25}rem`}}>
        {/* <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 h-2 rounded bg-gray-200"></div>
          <div className="col-span-1 h-2 rounded bg-gray-200"></div>
          <div className="col-span-3 h-2 rounded bg-gray-200"></div>
          <div className="col-span-3 h-2 rounded bg-gray-200"></div>
        </div> */}
        <BarsIcon className={`w-full h-auto text-stone-300`}/>
      </div>            
      
    </div>
  )
}
