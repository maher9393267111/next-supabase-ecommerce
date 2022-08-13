import React from 'react';
import {addToCart , findUserCart ,  removeFromCart  } from '../../helper/functions';
import {useState, useEffect} from 'react';
import { supabase } from '../../helper/db';
import { useglobal } from '../../context';

const ProductCard = ({product}) => {


//const [cart, setCart] = useState([])
const {  refreshcart ,  setRefreshcart , cart , setCart} = useglobal();

const authuser = supabase?.auth.user();
const add = (product) => {

const prdobj ={
user_id:authuser?.id,
product_id:product.id,
quantity:1,
product_price:product.price,
category_name:product.category?.name,
category_id:product.category?.id,
image:product?.images[0]?.url,
product_name:product.name,
in_storage:product.quantity,

}
addToCart(prdobj)
setRefreshcart(!refreshcart)
usercart(authuser?.id)

}


useEffect(() => {
usercart(authuser?.id)
   

}, [authuser , refreshcart])


const usercart =(authuserID) => {

    findUserCart(authuserID).then(res => {
        setCart(res)
    })

}



const remove = async(productid) => {

 await   removeFromCart(productid)
    usercart(authuser?.id)
}


    return (
        <div className = 'w-[300px]'>
            <div class="card w-auto bg-base-100 shadow-xl">
  <figure><img src={product?.images[0]?.url} alt="Shoes" /></figure>
  <div class="card-body">
    <h2 class="card-title">
      {product?.name} 
      <div class="badge badge-secondary">NEW</div>
      <div class="badge badge-secondary">${product?.price}</div>
    </h2>
    <p>{product?.desc.slice(0,47)} .....</p>
    <div class="card-actions justify-center">
      <div class="badge cursor-pointer badge-outline">wishlist</div> 
      <button
     // disabled={cart.some(item => item.product_id === product.id)}
      onClick={() => cart.some(item => item.product_id === product.id) ? remove(product.id) : add(product)}
      
      class="badge  cursor-pointer badge-warning">{
cart.find(item => item.product_id === product.id) ? 'remove from cart' : 'add to cart'


      }</button>
      <div class="badge cursor-pointer   badge-success text-white font-bold  ">{product?.category?.name}</div>
    </div>
  </div>
</div>
            
        </div>
    );
}

export default ProductCard;
