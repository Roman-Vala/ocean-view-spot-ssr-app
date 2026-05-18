import React from 'react';
import Heart from '../../Icons/Heart';
import ProductList from './ProductList';

export default function RecentProducts() {
  return (
    <div>
      <div className="mb-1 flex items-center text-gray-800">
        <Heart className={'mr-1'}/>
        <div className='uppercase text-sm'>Recently Crafted</div>
        
      </div>

      <ProductList tag={'new'}/>

    </div>
  )
}
