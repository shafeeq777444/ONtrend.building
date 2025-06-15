import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "../config";
import { getBoundingBox } from "../../lib/distance";

// fetchAllTopVendors --(Top)-----------------------------
export async function fetchAllTopVendors() {
  try {
    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      where("role", "==", "Vendor"),
      where("isApproved", "==", true),
      where("isTop", "==", true)
    );
    const querySnapshot = await getDocs(q);
    const vendors = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // Sort vendors by isOnline: true first
    const sortedVendors = vendors.sort((a, b) => {
      return (b.isOnline === true) - (a.isOnline === true);
    });
    return sortedVendors;
  } catch (error) {
    console.error("Error fetching top vendors:", error);
    return [];
  }
}

// fetchAllFoodVendors
export async function fetchAllFoodVendors(){try {
    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      where("role", "==", "Vendor"),
      where("vendorType", "==", "Food/Restaurant"),
      
    );
    const querySnapshot = await getDocs(q);
    const vendors = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // Sort vendors by isOnline: true first
    const sortedFoodVendors = vendors.sort((a, b) => {
      return (b.isOnline === true) - (a.isOnline === true);
    });
    return sortedFoodVendors;
  } catch (error) {
    console.error("Error fetching top vendors:", error);
    return [];
  }
}




// fetch nearest discounted vendors
export async function getNearbyDiscountOfferVendors(userLat, userLng) {
  const distanceLimit = 15;
  try{
  const { minLat, maxLat, minLng, maxLng } = getBoundingBox(userLat, userLng, distanceLimit);
console.log(minLat,maxLat,minLng,maxLng,"its key")
  const q = query(
    collection(db, "users"),
    where("role", "==", "Vendor"),
    // where("vendorType", "==", "Food/Restaurant"), //erro-wuery
    where("discountValue", ">", 0),
    // where("location.lat", ">=", minLat),
    // where("location.lat", "<=", maxLat),
    // where("location.lng", ">=", minLng),
    // where("location.lng", "<=", maxLng),
    limit(15)
  );

  const snapshot = await getDocs(q);
  console.log(snapshot,"--snapshot")

  const nearby = [];

  snapshot.forEach((doc) => {
    const data = doc.data();
    // const dist = getDistanceInKm(userLat, userLng, data.location.lat, data.location.lng);
    // if (dist <= distanceLimit) {
      nearby.push({ id: doc.id, ...data, 
        // distance: dist 
      }
    );
    }
    // }
  );
  console.log(nearby,'discount data')
  return nearby
  // .sort((a, b) => a.distance - b.distance);
  }
  catch(er){
    console.log(er,"erorrr")
    return []
  }
  
}



// fetchTopRatedFoodVendors :getdocs:
export async function fetchTopRatedFoodVendors(){
  try {
    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      where("role", "==", "Vendor"),
      where("vendorType", "==", "Food/Restaurant"),
      where("isTop", "==", true)
    );
    const querySnapshot = await getDocs(q);
    const vendors = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(vendors,"ff")
    // Sort vendors by isOnline: true first
    const sortedFoodVendors = vendors.sort((a, b) => {
      return (b.isOnline === true) - (a.isOnline === true);
    });
    console.log(sortedFoodVendors)
    return sortedFoodVendors;
  } catch (error) {
    console.error("Error fetching top vendors:", error);
    return [];
  }
}