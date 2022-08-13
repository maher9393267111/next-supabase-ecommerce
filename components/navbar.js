import React from 'react';
import { useglobal } from '../context';
import { supabase } from '../helper/db';
import { Dialog, Transition } from '@headlessui/react'
import { useEffect, useState ,useRef } from 'react';
import { findUser , findUserCart ,  updateCartQuantity ,  decreaseCartQuantity ,  removeFromCart , cartTotalPrice  } from '../helper/functions';
//import { XIcon } from '@heroicons/react/outline'
//import Drawerbar from './global/drawerbar';
import Link from 'next/link';
import {
  Button,
 
  useDisclosure,
 
  Input,
 
  
  Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Box

} from "@chakra-ui/react";
const Navbar = ({   }) => {

const {userinfo ,setUserinfo ,  refreshcart , cart ,setCart} = useglobal();
const [count, setCount] = useState(0);
 const { isOpen, onOpen, onClose } = useDisclosure()
const authuser = supabase?.auth.user();
const [total, setTotal] = useState(0);
//console.log('userinfo is navberrr ----->', userinfo?.role)

const incrementCount = async(product) => {
  // Update state with incremented value
  if (product.quantity >= product.in_storage) {
    alert('we have only '+product.in_storage+' items in stock')
    return
  }

   else {
    setCount(count + 1);
 await  updateCartQuantity(product  )
   usercartfind (authuser?.id)
  }



};



const decreamentCount = async(product) => {
  // Update state with incremented value


  if (product.quantity === 1) {
    alert(' yo can not decreament less than 1')
    return
  }

   else {
    setCount(count + 1);
 await   decreaseCartQuantity(product  )
    usercartfind (authuser?.id)
  }



};



const removeproduct = async(productid) => {

 await removeFromCart(productid)
  usercartfind (authuser?.id)

}




useEffect(() => {

    if (authuser) {
        findUser(authuser).then(res => {
            setUserinfo(res)
        }).catch(err => {
            console.log(err)
        })

        usercartfind(authuser?.id)


    }
}
   ,  [authuser ,  ])



const usercartfind = async(userid) => {
 await findUserCart(userid).then(res => {
    //  console.log('cart is ----->', res)
        setCart(res)

      
       
    })

    // calculate total price of cart
    cartTotalPrice(authuser.id).then(res => {

      setTotal(res)
    })




}


const Logout = async() => {

    const { error } = await supabase.auth.signOut()
    setUserinfo({})
}


const handleopen = (product) => {
  onOpen()

  
  }
  




    return (
        <div>
            <div className="navbar bg-base-100 mt-4">
  <div className="flex-1">
    <Link href="/">
    <p className="btn btn-ghost normal-case text-xl">MYShop</p>
    </Link>
  </div>

{ userinfo?.id  ? 

(

  <div className="flex-none">
    <div className="dropdown dropdown-end">
      <label tabIndex="0" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" strokewidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <span className="badge badge-sm indicator-item">{cart?.length} </span>
        </div>
      </label>
      <div tabIndex="0" className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
        <div className="card-body">
          <span className="font-bold text-lg">{cart?.length} Items</span>
          <span className="text-info">Subtotal: $999</span>
          <div className="card-actions">
            <button
            onClick={onOpen}
            className="btn btn-primary btn-block">View cart</button>
          </div>
        </div>
      </div>
    </div>
    <div className="dropdown dropdown-end">
      <label tabindex="0" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src="https://placeimg.com/80/80/people" />
        </div>
      </label>
      <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile <span className="text-gray-600">{userinfo?.name}</span>
            <span className="badge">New</span>
          </a>
        </li>

{ userinfo?.role === 'admin' &&
        <li>
            <Link href="/admin/dashboard">
          <h1 className="justify-between">

         <span className="text-gray-600">{userinfo?.role} Dashboard</span>
          
          </h1>
            </Link>
        </li>
}

        <li><a>Settings</a></li>
        <li
        onClick={Logout}
        ><a>Logout</a></li>
      </ul>
    </div>
  </div>
) : ( 

<div>

<div className=' flex gap-10 '>
<Button colorScheme='blue'>
<Link href='/auth/login'>
Login
</Link>
    </Button>
<Button colorScheme='blue'>
<Link href='/auth/signup'>
Register
</Link>
    
    
   </Button>
</div>


</div>



)}
</div>
            <Drawerbar 
              onClose ={onClose}
              isOpen={isOpen}
              cart={cart}
              incrementCount={incrementCount}
              decreamentCount={decreamentCount}
              removeproduct={removeproduct}
              total={total}
             />
            
        </div>
    );
}

export default Navbar;



const Drawerbar = ( {isOpen,onClose ,cart ,  incrementCount ,  decreamentCount , removeproduct  , total} ) => {


    const btnRef = React.useRef()
    return (
        <div>
              <>
      {/* <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
        Open
      </Button> */}
      <Drawer
      size='lg'
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Cart Products</DrawerHeader>

          <DrawerBody>
            {/* <Input placeholder='Type here...' /> */}

<Box>



                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Box className="text-lg font-medium text-gray-900"> Shopping cart </Box>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <Box className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cart.map((product) => (
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.image}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={product.id}> {product.product_name} </a>
                                      </h3>
                                      <p className="ml-4">{product.product_price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">Black</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className = ' flex gap-4'>
<p>
<button
onClick={()=>{  incrementCount(product) }}
>+</button>

  </p>
                                    <p className="text-gray-500">Qty {product.quantity}</p>
                                    <p>
<button
onClick={()=>{ decreamentCount(product) }}
>-</button>
                                    </p>
                                    </div>
                                   

                                    <div className="flex">
                                      <button
                                      onClick={()=>{ removeproduct(product?.product_id) }}
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>:::{total}</p>
                        <p>$262.00</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping<span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
               




</Box>




          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  
            
        </div>
    );
}

// export default Drawerbar;