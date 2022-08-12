import React from 'react';
import Adminlayout from '../../../components/admin/adminlayout';
import Createform from '../../../components/admin/product/createproduct';
import {useState, useEffect} from 'react';  
import {fetchProducts} from '../../../helper/functions';
import ProductsTable from '../../../components/admin/product/productsTable';
const Products = () => {

const [products, setProducts] = useState([])


useEffect(() => {

    fetchProducts().then(res => {
 
 
    
        setProducts(res)
        console.log('products is ⏺⏺⏺ ----->',res, products)
       
      })

} ,[])



    return (
       <Adminlayout>
        <h1>Products</h1>

<div>
    <Createform />
</div>

{/* ----- products Table----- */}

<div>
    <ProductsTable products={products} />
</div>
<div>
    
</div>


       </Adminlayout>
    );
}

export default Products;
