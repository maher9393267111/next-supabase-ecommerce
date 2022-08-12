import React from 'react';

const SingleTable = ({product}) => {
    return (
        <tr key={product.id}>
<th>{product?.name}</th>
<td>{product?.quantity}</td>
<td>{product?.price}</td>
<td>   <img className='w-8 h-8  rounded-full object-fit' src={product.images[0]?.url} alt="" /></td>
<td>{product?.category?.name}</td>
</tr>

    );
}

export default SingleTable;
