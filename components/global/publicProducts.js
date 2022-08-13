import React from 'react';
import {useState, useEffect} from 'react';
import ProductCard  from './productCard'
const PublicProducts = ({products}) => {
    return (
        <div>

<div className= ' grid  sm:grid-cols-2 '>

{ products && products?.length > 0 ?  products?.map((product, index) => (

<div key = {index}  className=' my-6 '>
<ProductCard product={product} />
</div>

)) : <div className='text-center'>No products found</div>}


</div>


            
        </div>
    );
}

export default PublicProducts;
