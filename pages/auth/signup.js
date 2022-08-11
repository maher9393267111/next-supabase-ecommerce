import { useRouter } from 'next/router'
import { useState } from 'react'
import { Loader } from '../../components/ui/loader'
import { supabase } from '../../helper/db'
import {updateUser} from '../../helper/functions'
import { useEffect } from 'react'
import  UserLayout from '../../components/user/userlayout'
import {toast} from 'react-toastify'
export default function Signup() {
  const router = useRouter()
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    username: ''
  })


  const authuser = supabase.auth.user()	
  console.log('authuser', authuser)


const [loading , setLoading] = useState(false)
 

const signup2 = async () => {

    const { user, session, error } = await supabase.auth.signUp(
        {
          email: 'exame@email.com',
          password: 'example-password',
        },
        {
          data: { 
            first_name: 'John', 
            age: 27,
          }
        }
      )
        console.log('user', user , session , error)

}





  const signup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

// sign  then update users table

const {user ,error}  = await supabase.auth.signUp({
  email : userData.email,
  password : userData.password,
},{
  data : {
    role:'user',
  }
}

)

console.log('auth-signup', user, error)


const authuser = supabase.auth.user()	
 console.log('authuser', authuser)
try{
const { userdata , error:usererror} = await supabase.from('users').insert({
  username: userData.username,
name: userData.name,
email: userData.email,
//user_id: user.id,
id: user.id,
verified: authuser ? true : false,
cart : [],
wishlist : [],
 
})
toast.success('signup success verify your email')
}catch(err){
  console.log('err', err)
  toast.error(err.message)
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
    <UserLayout auth={true}  name={'login'}>
    <div className='min-h-screen grid place-items-center text-xl'>
      <div className='w-2/3 lg:w-2/3 shadow-lg flex flex-col items-center'>
        <h1 className='text-4xl font-semibold'>Sign up</h1>
        <div className='mt-8 w-full lg:w-auto px-4'>
          <p>Name {userData?.name}</p>
          <input
            type='text'
            className='h-8 focus:outline-none shadow-sm border p-4 rounded mt-2 w-full lg:w-auto'
            name='name'
            value={userData.name}
            onChange={changeUserData}
          />
        </div>
        <div className='mt-8 w-full lg:w-auto px-4'>
          <p>Username</p>
          <input
            type='text'
            className='h-8 focus:outline-none shadow-sm border p-4 rounded mt-2 w-full lg:w-auto'
            name='username'
            value={userData.username}
            onChange={changeUserData}
          />
        </div>
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
          
              <span>Sign up</span>
            
          </button>
            }
        </div>
      </div>
    </div>
    </UserLayout>
  )
}