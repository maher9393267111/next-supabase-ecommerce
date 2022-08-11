import { supabase } from './db'

export const updateUser = async (authuser) => {

    if (authuser?.id) {
  console.log('executing updateUser')
    const { user, error } = await supabase.from('users').update({
      verified: true,
  
  }).eq('id', authuser.id)
  console.log('updateUser', user, error)
    }
  
  }
  