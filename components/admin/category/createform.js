import React from 'react';
import {useState, useEffect} from 'react';
import { supabase } from '../../../helper/db';
import {Loader} from '../../ui/loader';
import {Avatar} from '@chakra-ui/react'
const Createform = () => {


    const [userData, setUserData] = useState({
   
        name: '',
        slug: '',
        
       
      })

      const [image, setImage] = useState('')
      const [uploading, setUploading] = useState(false)
      const [file, setFile] = useState("");
      const [imname, setImname] = useState('')
      const [loading, setLoading] = useState(false)


    const changeUserData = ({ target: { name, value } }) => {
        setUserData({ ...catData, [name]: value.trim() })
      }


      const uploadImage = async (e) => {
        // upload image to  supabase storage
        setUploading(true)
        const image = e.target.files[0];
        console.log("image", image);
    
        const { data, error } = await supabase.storage
          .from("my-storage")
          .upload(`category/${image?.name}`, image);
       
    
          const { data:imageData, error:imageError } = await supabase.storage.from('my-storage').getPublicUrl(`category/${image?.name}`)
          //download(image?.name)
    
          setFile(imageData);
          console.log("File-------->", file);
    
        console.log('imageData', imageData)
        console.log('imageError', imageError)
    
        if( file || imageData) {
        setUploading(false)
        }  
       
      
      };


function handlesubmit(e) {
    e.preventDefault()
    console.log(userData)
}







    return (
      <div>
        <div className=' text-center'>

<div>
<div className='min-h-screen w-2/3 grid place-items-center text-xl'>
      <div className='w-2/3 lg:w-2/3 shadow-lg flex flex-col items-center'>
        <h1 className='text-4xl font-semibold'>Create Form
        </h1>
        <div className='mt-8 w-full lg:w-auto px-4'>
          <p>name</p>
          <input
            type='text'
            className='h-8 focus:outline-none shadow-sm border p-4 rounded mt-2 w-full lg:w-auto'
            name='name'
             value={userData.name}
             onChange={changeUserData}
          />
        </div>
        <div className='my-8 w-full lg:w-auto px-4'>
          <p>slug</p>
          <input
            className='h-8 focus:outline-none shadow-sm border p-4 rounded mt-2 w-full lg:w-auto'
            type='text'
            name='slug'
            value={userData.password}
             onChange={changeUserData}
          />
        </div>

{/* ----image---- */}


<label>
          { uploading ? (
              <Loader height={'50px'} width= {'50px'}/> 
          ) 
          : file && file?.publicURL ? (
            
            <Avatar name='Dan Abrahmov' src={file?.publicURL} />
           
          ) : (
            <img src ='https://cdn1.iconfinder.com/data/icons/camera-and-photography-3/64/Camera_photography-256.png' className="mt-2 w-10 h-10" />
          )}
          <input onChange={uploadImage} type="file" accept="images/*" hidden />
        </label>


     
        <div className='mb-8 w-3/5'>
            {
                loading ? <Loader height={'50px'} width= {'50px'}/> :
            
          <button
            className='bg-blue-500 text-white px-8 py-2 rounded w-full'
            
             onClick={handlesubmit}
          >
          
              <span>Create</span>
            
          </button>
            }
        </div>
      </div>
    </div>



</div>



        </div>





      </div>
    );
}

export default Createform;
