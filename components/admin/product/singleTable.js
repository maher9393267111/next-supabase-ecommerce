import React from 'react';
import {useglobal} from '../../../context'
import {deleteProduct } from '../../../helper/functions'
const SingleTable = ({product ,  onOpen}) => {


const {  setProductid ,productid} = useglobal()


const handleedit = (product) => {
onOpen()
setProductid(product)

}



    return (
        <tr key={product.id}>
<th>{product?.name}</th>
<td>{product?.quantity}</td>
<td>{product?.price}</td>
<td>   <img className='w-8 h-8  rounded-full object-fit' src={product.images[0]?.url} alt="" /></td>
<td>{product?.category?.name}</td>

<td>
<div>
    <button
    onClick={()=>{handleedit(product.id)}}
    
    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4'>
        Edit 
     

    </button>

    <button
    onClick={()=>{deleteProduct(product.id)}}
    className='bg-red-300 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'>
        Delete
    </button>
</div>


</td>


</tr>

    );
}

export default SingleTable;
