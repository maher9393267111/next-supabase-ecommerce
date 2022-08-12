import React from 'react';
import SingleTable from './singleTable';
const ProductsTable = ({products}) => {
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
      </tr>
    </thead>

  <tbody>

    {products.map(product => (

        <SingleTable key={product.id} product={product} />


    ))}

      {/* <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr>
    */}
     
    </tbody>
  </table>
</div>
    </div>


    );
}

export default ProductsTable;
