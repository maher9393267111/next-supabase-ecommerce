import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
const SidebarAdmin = () => {
    return (
       <div>
       
<div>
<ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
      
      <li> 
         <Link href="/admin/dashboard">
        <p>Categories</p>
        </Link>
        </li>
      <li>
        <Link href="/admin/products">
        <p>Products</p>
        </Link>
      </li>
      </ul>
</div>

       </div>
    );
}

export default SidebarAdmin;
