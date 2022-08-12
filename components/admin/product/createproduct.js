import React from 'react';
import {useState, useEffect} from 'react';
import { supabase } from '../../../helper/db';
import {Loader} from '../../ui/loader';
import {Avatar} from '@chakra-ui/react'
import {fetchCategories ,uploadImgs } from '../../../helper/functions';
const Createform = () => {


    const [catData, setCatData] = useState({
   
        name: '',
        slug: '',
        quantity: '',
        price: '',
        description: '',
        images: [],
        category: '',
        categories: [],


        
       
      })

      const [image, setImage] = useState('')
      const [uploading, setUploading] = useState(false)
  
      const [imname, setImname] = useState('')
      const [loading, setLoading] = useState(false)
const [files, setFiles] = useState([])



    const changeUserData = ({ target: { name, value } }) => {
        setCatData({ ...catData, [name]: value.trim() })
      }


      const uploadImage = async (e) => {
        // upload image to  supabase storage
        setUploading(true)
        const images = e.target.files;
        console.log("images------->", images);
const imgArr = []


for (let image  of images) {

    const { data, error } = await supabase.storage
          .from("my-storage")
          .upload(`products/${image?.name}`, image);
       
    
          const { data:imageData, error:imageError } = await supabase.storage.from('my-storage').getPublicUrl(`products/${image?.name}`)
          //download(image?.name)
    
          imgArr.push(imageData?.publicURL)
        //  console.log("imageData------->🛢️🛢️", imageData);
        
          
    
     
      //  console.log('imageError', imageError)
    
        if( files || imageData) {
        setUploading(false)
        }  
       console.log("imgArr------->", imgArr);

       setFiles((prevState) => [...imgArr]);
     //    setFiles( imgAr)
       console.log("File-------->", files);

}


    
    
      
      };


// fetch all categories from supabase






useEffect(() => {

    fetchCategories().then(res => {
        setCatData({...catData, categories: res})
    })
    console.log("catData------->", catData?.categories);

}, [])





      async function handleSubmit(e) {
       
        e.preventDefault();
      setLoading(true)
    
// filter only url image from files array
const filteredFiles = files.filter(file => file.publicURL)
//console.log('files', filteredFiles)
//console.log("filteredFiles------->", filteredFiles);


        const { data, error } = await supabase
          .from("products")
          .insert({
         
           admin_id : supabase.auth.user()?.id,
            name: catData.name,
          
            quantity: catData.quantity,
            price: catData.price,
            desc: catData.description,
            category_id: catData.category,
            images: files,
            sold:0,
          });
    
        console.log("inserted", data);
        setLoading(false)
    //    await getPosts();
    
        if (error) console.log("err", error);
      }
    






    return (
      <div>
        <div className=' text-center'>

<div>
<div className='min-h-screen w-2/3 grid place-items-center text-xl'>
      <div className='w-2/3 lg:w-2/3 shadow-lg flex flex-col items-center'>
        <h1 className='text-3xl font-semibold'>Create Product
        </h1>
        <div className='mt-8 w-full lg:w-auto px-4'>
          <p>name</p>
          <input
            type='text'
            className='h-8 focus:outline-none shadow-xl border p-4 rounded mt-2 w-full lg:w-auto'
            name='name'
             value={catData.name}
             onChange={changeUserData}
          />
        </div>
        <div className='my-8 w-full lg:w-auto px-4'>
          <p>slug</p>
          <input
            className='h-8 focus:outline-none shadow-sm border p-4 rounded mt-2 w-full lg:w-auto'
            type='text'
            name='slug'
            value={catData.password}
             onChange={changeUserData}
          />
        </div>

        <div className='my-8 w-full lg:w-auto px-4'>
          <p>quantity</p>
          <input
            className='h-8 focus:outline-none shadow-sm border p-4 rounded mt-2 w-full lg:w-auto'
            type='number'
            name='quantity'
            value={catData.quantity}
             onChange={changeUserData}
          />
        </div>


        <div className='my-8 w-full lg:w-auto px-4'>
          <p>Price</p>
          <input
            className='h-8 focus:outline-none shadow-sm border p-4 rounded mt-2 w-full lg:w-auto'
            type='number'
            name='price'
            value={catData.price}
             onChange={changeUserData}
          />
        </div>



        <div className='my-8 w-full lg:w-auto px-4'>
          <p>Desc</p>
          <textarea
            className='h-12 focus:outline-none shadow-sm border p-4 rounded mt-2 w-full lg:w-auto'
            type='text'
            name='description'
            value={catData.description}
             onChange={changeUserData}
          />
        </div>

        <select 
        onChange={(e) => setCatData({...catData, category: e.target.value})}
        
        className="select select-info w-full max-w-xs">
  <option disabled selected>Select Category</option>
  
{ catData.categories?.map((cat, index) => (
    <option key={index} value={cat.id}>{cat.name}</option>
))}


</select>

{catData?.category}

{/* ----image---- */}


<label>
          { uploading ? (
              <Loader height={'50px'} width= {'50px'}/> 
          ) 
          : files && files?.length > 0 ? (
            <div className= 'flex gap-4'>
                {files.map((file, index) => (
                  <div key={index}>
   <Avatar name='Dan Abrahmov' src={file} />
                  </div>  
                ))}

            </div>
            
          
           
          ) : (
            <img src ='https://cdn1.iconfinder.com/data/icons/camera-and-photography-3/64/Camera_photography-256.png' className="mt-2 w-10 h-10" />
          )}
          <input onChange={uploadImage} type="file" multiple accept="images/*" hidden />
        </label>


     
        <div className='mb-8 w-3/5'>
            {
                loading ? <Loader height={'50px'} width= {'50px'}/> :
            
          <button
            className='bg-blue-500 text-white px-8 py-2 rounded w-full'
            
             onClick={handleSubmit}
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
