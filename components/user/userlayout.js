import React from 'react';
import { useRouter } from 'next/router';
import { useState  } from 'react';
import Navbar from '../navbar';
import Sidebar from './sidebar';
const UserLayout = ({children}) => {
    return (
        <div>

            <div>
                <Navbar />
            </div>

<div className=' grid grid-cols-12'>

<div className=' col-span-3 lg:col-span-4'>
<Sidebar />
</div>


<div className=' col-span-9 lg:col-span-8'>
{children}
</div>




</div>


            
        </div>
    );
}

export default UserLayout;
