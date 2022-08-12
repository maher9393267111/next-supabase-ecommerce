import React from 'react';
import Adminlayout from '../../../components/admin/adminlayout';
import Createform from '../../../components/admin/product/createproduct';
import {useState, useEffect} from 'react';  
import {fetchProducts} from '../../../helper/functions';
import ProductsTable from '../../../components/admin/product/productsTable';
import UpdateModal from '../../../components/admin/product/updateModal';

import { useDisclosure } from "@chakra-ui/react";


const Products = () => {

const [products, setProducts] = useState([])

const { isOpen, onOpen, onClose } = useDisclosure()


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
    <ProductsTable products={products} isOpen ={isOpen} onOpen ={onOpen} onClose ={onClose}  />
</div>


<div>
    <UpdateModal isOpen ={isOpen} onOpen ={onOpen} onClose ={onClose} />
</div>

<div>
    
</div>


       </Adminlayout>
    );
}

export default Products;
