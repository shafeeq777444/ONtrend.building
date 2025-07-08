// src/lib/supabase/buildingsAPI.js

import { supabase } from "./client";



//------- fetch all buildings ---(in last add pagination or other thing)------------------
export async function getAllBuildings() {
  const { data, error } = await supabase
    .from('buildings')
    .select('*, building_media(images)') // fetch all columns
    //  .range(0, 9); 

  if (error) {
    console.error('Error fetching buildings:', error.message)
    throw error
  }

  return data
}

//------- fetch building  details ---------------------
// FOR SMALL SCALE DATA LIKE (IMG,AMEN,REVIEW)- IN LARGE SCALE CASE --->SWITCH TO BELOW CODE MODEL
//  (MAIN ISSUE FACE IN REVIEW CASE ABOVE 20 REVIEW REVIEWS TAKE IN ONLY 10 DATA OTHER TAKE ANOTHER API)
// (IF AMANTIES ALSO ABOVE 20 THAT ALSO TAKE 10 IN THIS API AND DETAILS AMANTIES TAKE ANOTHER API)

export async function getBuildingDetail(id) {
  const { data, error } = await supabase
    .from('buildings')
    .select(`
      *,
      building_media(images),
      building_amenities(
        
        amenities(*)
      )
    `)
    .eq('id', id)
    .single(); 

  if (error) {
    console.error('Error fetching building detail:', error.message);
    throw error;
  }

  return data;
}


// FOR LARGE SCALE
// //  ******** Fetch Single Building by ID ********
// export async function getBuildingById(id) {
//   const { data, error } = await supabase
//     .from('buildings')
//     .select('*')
//     .eq('id', id)
//     .single();

//   if (error) {
//     console.error('Error fetching building:', error.message);
//     throw error;
//   }

//   return data;
// }

// //  ********  Fetch Media for a Building ********
// export async function getBuildingMedia(id) {
//   const { data, error } = await supabase
//     .from('building_media')
//     .select('*')
//     .eq('building_id', id);

//   if (error) {
//     console.error('Error fetching building media:', error.message);
//     throw error;
//   }

//   return data;
// }

// //  ********  Fetch Amenities for a Building ********
// export async function getBuildingAmenities(id) {
//   const { data, error } = await supabase
//     .from('building_amenities')
//     .select('*, amenities(*)')
//     .eq('building_id', id);

//   if (error) {
//     console.error('Error fetching amenities:', error.message);
//     throw error;
//   }

//   return data;
// }

