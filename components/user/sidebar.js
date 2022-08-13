import React from 'react';
import {fetchCategories } from '../../helper/functions';
import {useState, useEffect} from 'react';
import Link from 'next/link';




const Sidebar = () => {
    const [categories, setCategories] = useState([])

useEffect(() => {

    
    fetchCategories().then(res => {
    
   // console.log('categories is ⏺⏺⏺ ----->',res)
    setCategories(res)
    
    })
    

}, [])



    return (
       <div>
        <h1 className='font-bold badge badge-secondary'><Link  href ='/'>ALLPRODUCTS</Link> </h1>

<div>


<ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">

    {categories.map((category, index) => (

<li> <Link href={`/?category=${category?.id}`}>{category?.name}</Link> </li>

    ) )}

  
</ul>



</div>


       </div>
    );
}

export default Sidebar;
