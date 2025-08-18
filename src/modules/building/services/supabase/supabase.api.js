import { supabase } from "@/lib/supabase/client";

export async function getRoomsBasedOnSearchRange({
    adultCount = 1,
    childrenCount = 0,
    page = 0,         // 0-based page number
    pageSize = 10,    // items per page
  }) {
    try {
      const from = page * pageSize;
      const to = from + pageSize - 1;
  
      let query = supabase
        .from("rooms")
        .select(`
          *,
          room_type(*),
          bed_type(*),
          building_id(*)
        `)
        .order("max_adults", { ascending: true })    // 1st priority
        .order("max_children", { ascending: true })  // 2nd priority
        .order("id", { ascending: true })            // tie-breaker for stability
        .range(from, to);
  
      // Filters
      if (adultCount != null) query = query.gte("max_adults", adultCount);
      if (childrenCount != null) query = query.gte("max_children", childrenCount);
  
      const { data: rooms, error } = await query;
      if (error) throw error;
  
      return rooms;
    } catch (error) {
      console.error("Error fetching rooms:", error.message);
      throw error;
    }
  }
  
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

//------------------------------- fetch building  details page ---------------------------------------------------------------

export async function getBuildingDetail(id) {
    const { data, error } = await supabase
        .from("buildings")
        .select(
            `
            *,
            building_media(images),
            building_amenities(
                amenities(*)
            )
        `
        )
        .eq("id", id)
        .single();

    if (error) {
        console.error("Error fetching building detail:", error.message);
        throw error;
    }

    return data;
}