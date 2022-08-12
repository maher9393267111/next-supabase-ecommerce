import React from 'react';
import Adminlayout from '../../../components/admin/adminlayout';
import Createform from '../../../components/admin/product/createproduct';
import {useState, useEffect} from 'react';  
const Products = () => {
    return (
       <Adminlayout>
        <h1>Products</h1>

<div>
    <Createform />
</div>


       </Adminlayout>
    );
}

export default Products;
