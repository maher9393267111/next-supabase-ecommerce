import React from 'react';
import { useglobal } from '../context';
import { supabase } from '../helper/db';

import { useEffect, useState ,useRef } from 'react';
import { findUser , findUserCart  } from '../helper/functions';
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

} from "@chakra-ui/react";
const Navbar = ({   }) => {

const {userinfo ,setUserinfo ,  refreshcart , cart ,setCart} = useglobal();

 const { isOpen, onOpen, onClose } = useDisclosure()
const authuser = supabase?.auth.user();

//console.log('userinfo is navberrr ----->', userinfo?.role)


useEffect(() => {

    if (authuser) {
        findUser(authuser).then(res => {
            setUserinfo(res)
        }).catch(err => {
            console.log(err)
        })

        findUserCart(authuser?.id).then(res => {
          console.log('cart is ----->', res)
            setCart(res)
        })


    }
}
   ,  [authuser ,  ])


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
             />
            
        </div>
    );
}

export default Navbar;



const Drawerbar = ( {isOpen,onClose} ) => {


    const btnRef = React.useRef()
    return (
        <div>
              <>
      {/* <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
        Open
      </Button> */}
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Input placeholder='Type here...' />
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