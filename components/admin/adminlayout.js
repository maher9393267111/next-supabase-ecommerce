import React from 'react';
import { useglobal } from '../../context';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Sidebar from './sidebar';
import Navbar from '../navbar';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { supabase } from '../../helper/db';
import { findUser } from '../../helper/functions';
import {toast} from 'react-toastify'

const Adminlayout = ({children}) => {

    const authuser = supabase?.auth.user();
    const {userinfo  } = useglobal();
  //  console.log('userinfo is adminn----->', authuser?.user_metadata?.role)


const router = useRouter();

useEffect(() => {

if (authuser && authuser.user_metadata?.role !=='admin') {
 //   toast.error(`You are not authorized to access this page ${userinfo?.role}`)
    setTimeout(() => {
        router.push('/') 
    }, 2000);

}


}, [userinfo])



useEffect(() => {
    if (authuser) {
        findUser(authuser).then(res => {
            setUserinfo(res)
        }).catch(err => {
            console.log(err)
        })
    }
    
}, [authuser])


    return (
        <div>
            
            <div className=' pb-12 mb-12'>


<div>
    <Navbar userinfo= {userinfo} />
</div>

<ToastContainer position="top-center" />

<div className=' grid grid-cols-12'>


<div className=' col-span-3 lg:col-span-4'>
<Sidebar />
</div>




<div className={ ` col-span-9 lg:col-span-8  `}>
{children}
</div>




</div>



</div>
        </div>
    );
}

export default Adminlayout;
