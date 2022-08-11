import {
   useMutation
  } from "@tanstack/react-query";
import {supabase} from '../helper/db'

export const signup = async ({ email, password, username }) => {
  const { data: userWithUsername } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single()

  if (userWithUsername) {
    throw new Error('User already exists')
  }

  const { data: userWithEmail } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (userWithEmail) {
    throw new Error('Email is already used')
  }

  const { data, error: signUpError } = await supabase.auth.signUp({
    email,
    password
  })

  console.log('data auth-------->',data)
//   const { data: insertData, error: insertError } = await supabase
//   .from('users')
//   .insert({
//     name: data.name,
//     username: data.username,
//     user_id: data.user.id
//   })




console.log('auth-signup', data, signUpError)
  if (signUpError) {
    throw signUpError
  }

  return data
}

export const useSignup = (user) =>
  useMutation('signup', () => signup(user), {
    onSuccess: async (data) => {
      const { data: insertData, error: insertError } = await supabase
        .from('users')
        .insert({
          name: user.name,
          username: user.username,
          user_id: data.user.id
        })
        console.log('hfffffffffffff')

      if (insertError) {
        throw insertError
      }

      return insertData
    }
  })