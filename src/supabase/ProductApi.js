// src/lib/supabase/buildingsAPI.js
import { supabase } from './client'


//------- fetch all buildings ---(in last add pagination or other thing)------------------
export async function getAllBuildings() {
  const { data, error } = await supabase
    .from('buildings')
    .select('*, building_media(images)') // fetch all columns
     .range(0, 9); 

  if (error) {
    console.error('Error fetching buildings:', error.message)
    throw error
  }

  return data
}
