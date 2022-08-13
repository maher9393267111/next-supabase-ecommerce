import React from 'react';
import { useRouter } from 'next/router';
import { useState  } from 'react';
import Navbar from '../navbar';
import Sidebar from './sidebar';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDisclosure} from "@chakra-ui/react";

const UserLayout = ({children ,auth=false ,name}) => {

  

    return (
        <div className=' '>


            <div>
                <Navbar  />

             

            </div>
            <ToastContainer position="top-center" />


<div className=' grid grid-cols-12'>

 { !auth && 
<div className=' col-span-3 lg:col-span-4'>
<Sidebar />
</div>
}



<div className={ `${auth ? 'col-span-12 ' : 'col-span-9 lg:col-span-8'}  `}>
{children}
</div>




</div>


            
        </div>
    );
}

export default UserLayout;
