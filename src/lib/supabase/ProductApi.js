// src/lib/supabase/buildingsAPI.js

import { supabase } from "./client";

//------- fetch all buildings ---(in last add pagination or other thing)------------------
export async function getAllBuildings() {
    const { data, error } = await supabase.from("buildings").select("*, building_media(images)"); // fetch all columns
    //  .range(0, 9);

    if (error) {
        console.error("Error fetching buildings:", error.message);
        throw error;
    }

    return data;
}

// FOR SMALL SCALE DATA LIKE (IMG,AMEN,REVIEW)- IN LARGE SCALE CASE --->SWITCH TO BELOW CODE MODEL
//  (MAIN ISSUE FACE IN REVIEW CASE ABOVE 20 REVIEW REVIEWS TAKE IN ONLY 10 DATA OTHER TAKE ANOTHER API)
// (IF AMANTIES ALSO ABOVE 20 THAT ALSO TAKE 10 IN THIS API AND DETAILS AMANTIES TAKE ANOTHER API)
//------------------------------- fetch building  details page ---------------------------------------------------------------

export async function getBuildingDetail(id) {
    const { data, error } = await supabase
        .from("buildings")
        .select(`
            *,
            building_media(images),
            building_amenities(
                amenities(*)
            )
        `)
        .eq("id", id)
        .single();

    if (error) {
        console.error("Error fetching building detail:", error.message);
        throw error;
    }

    return data;
}

// fetch Rooms Based On Buildings--------------------------------
export async function getRoomsBasedOnBuildingId(buildingId) {
    const { data: rooms, error } = await supabase
        .from("rooms")
        .select(`
            *,
            room_type(*),
            bed_type(*)
        `)
        .eq("building_id", buildingId)
        .order("room_number", { ascending: true });

    if (error) {
        console.error("Error fetching rooms based on building id:", error.message);
        throw error;
    }

    const roomTypeMap = new Map();

    for (const room of rooms || []) {
        const type = room.room_type;
        if (type) {
            if (!roomTypeMap.has(type.id)) {
                // Clone type object and add count
                roomTypeMap.set(type.id, { ...type, count: 1 });
            } else {
                // Increment existing count
                roomTypeMap.get(type.id).count += 1;
            }
        }
    }

    return {
        rooms: rooms || [],
        roomTypes: Array.from(roomTypeMap.values()),
    };
}


//---------------------------------------------------------------- Room Details Page--------------------------------
export async function getRoomDetail(id) {
    // Step 1: Fetch room details
    const { data: room, error } = await supabase
        .from("rooms")
        .select(`
            *,
            room_type(*),
            bed_type(*)
        `)
        .eq("id", id)
        .single();

    if (error) {
        console.error("Error fetching room detail:", error.message);
        throw error;
    }

    // Step 2: Fetch full amenities info where id IN amenity_ids
    let amenities = [];
    if (room.amenity_ids && room.amenity_ids.length > 0) {
        const { data: amenitiesData, error: amenitiesError } = await supabase
            .from("room_amenities")
            .select("*")
            .in("id", room.amenity_ids);

        if (amenitiesError) {
            console.error("Error fetching room amenities:", amenitiesError.message);
        } else {
            amenities = amenitiesData;
        }
    }

    // Step 3: Attach to result)
    return {
        ...room,
        amenities, // full amenity objects here
    };
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
