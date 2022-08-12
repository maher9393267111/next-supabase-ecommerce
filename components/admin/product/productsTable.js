import React from 'react';
import SingleTable from './singleTable';
const ProductsTable = ({products , isOpen, onOpen, onClose }) => {
    return (
    <div>
        <div class="overflow-x-auto">
  <table class="table w-full">
  
    <thead>
      <tr>
        
        <th>Name</th>
        <th>quantity</th>
        <th>price</th>
        <th>image</th>
        <th>category</th>
        <th>Table</th>
      </tr>
    </thead>

  <tbody>

    {products.map(product => (

        <SingleTable key={product.id} product={product} isOpen ={isOpen} onOpen ={onOpen} />


    ))}

 
     
    </tbody>
  </table>
</div>
    </div>


    );
}

export default ProductsTable;
