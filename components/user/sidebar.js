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
        <h1>sidebar</h1>

<div>


{categories?.length}



</div>


       </div>
    );
}

export default Sidebar;
