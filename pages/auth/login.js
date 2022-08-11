import { useRouter } from 'next/router'
import { useState } from 'react'
import { Loader } from '../../components/ui/loader'
import { supabase } from '../../helper/db'
import {updateUser} from '../../helper/functions'
import { useEffect } from 'react'
export default function Signin() {
  const router = useRouter()
  const [userData, setUserData] = useState({
   
    email: '',
    password: '',
   
  })


  const authuser = supabase.auth.user()	
  console.log('authuser', authuser)


const [loading , setLoading] = useState(false)
 







  const signup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

// sign  then update users table

const { user, session, error } = await supabase.auth.signIn({
    email: userData.email,
    password: userData.password,
  })

console.log('login user data ------>', user, error)



 
try{





}catch(err){
  console.log('err', err)
}



     
    
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    authuser && updateUser(authuser)
   
   
   }, [authuser])
   




  const changeUserData = ({ target: { name, value } }) => {
    setUserData({ ...userData, [name]: value.trim() })
  }

  return (
    <div className='min-h-screen grid place-items-center text-xl'>
      <div className='w-2/3 lg:w-1/3 shadow-lg flex flex-col items-center'>
        <h1 className='text-4xl font-semibold'>Login</h1>
      
       
        <div className='mt-8 w-full lg:w-auto px-4'>
          <p>Email</p>
          <input
            type='text'
            className='h-8 focus:outline-none shadow-sm border p-4 rounded mt-2 w-full lg:w-auto'
            name='email'
            value={userData.email}
            onChange={changeUserData}
          />
        </div>
        <div className='my-8 w-full lg:w-auto px-4'>
          <p>Password</p>
          <input
            className='h-8 focus:outline-none shadow-sm border p-4 rounded mt-2 w-full lg:w-auto'
            type='password'
            name='password'
            value={userData.password}
            onChange={changeUserData}
          />
        </div>
     
        <div className='mb-8 w-3/5'>
            {
                loading ? <Loader height={'50px'} width= {'50px'}/> :
            
          <button
            className='bg-blue-500 text-white px-8 py-2 rounded w-full'
            
            onClick={signup}
          >
          
              <span>Login</span>
            
          </button>
            }
        </div>
      </div>
    </div>
  )
}