import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config";
import {  getDistanceInKm } from "../../lib/distance";

import localforage from "localforage";

// Constants
const AVERAGE_SPEED_KMPH = 35; // average city driving speed
const MAX_DISTANCE_KM = 15;
// fetchAllTopVendors --(Top)-----------------------------(added:distance,estimate time)(food,grocery,pharmacy)
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
        const userLocation = await localforage.getItem("userLocation");
        //  || { lat: 17.0193843, lng: 54.1107505 };
        const enrichedVendors = vendors
            ?.map((vendor) => {
                const loc = vendor.location;
                if (!loc?.lat || !loc?.lng) return null;

                const distance = getDistanceInKm(userLocation.lat, userLocation.lng, loc.lat, loc.lng);

                if (distance > MAX_DISTANCE_KM) return null;

                const estimatedTimeMin = Math.round((distance / AVERAGE_SPEED_KMPH) * 60);
                const totalTimeWithCooking = estimatedTimeMin + 15;

                const finalTime = totalTimeWithCooking >= 25 ? 25 : Math.round(totalTimeWithCooking);

                return {
                    ...vendor,
                    distance: Math.max(1, Math.round(distance * 10) / 10), // e.g., 6.3 km
                    estimatedTime: `${finalTime} `,
                };
            })
            .filter(Boolean)
            .sort((a, b) => (b.isOnline === true) - (a.isOnline === true)); // ✅ online vendors first

        return enrichedVendors;
    } catch (error) {
        console.error("Failed to fetch food vendors:", error.message || error);
        return []; // return empty array on failure
    }
}

// fetchAllFoodVendors-----(added:distance,estimate time)(small scale no issue)(large scale change:separe in each vendor type model)(use:food home)
export async function fetchAllFoodVendors() {
    try {
        const usersRef = collection(db, "users");
        const q = query(
            usersRef,
            where("role", "==", "Vendor"),
            where("isApproved", "==", true),
            where("vendorType", "==", "Food/Restaurant")
            // ..min lat
            // ..min lng
        );
        const querySnapshot = await getDocs(q);
        const vendors = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        const userLocation = await localforage.getItem("userLocation");
        //  || { lat: 17.0193843, lng: 54.1107505 };
        const enrichedVendors = vendors
            ?.map((vendor) => {
                const loc = vendor.location;
                if (!loc?.lat || !loc?.lng) return null;

                const distance = getDistanceInKm(userLocation.lat, userLocation.lng, loc.lat, loc.lng);

                if (distance > MAX_DISTANCE_KM) return null;

                const estimatedTimeMin = Math.round((distance / AVERAGE_SPEED_KMPH) * 60);
                const totalTimeWithCooking = estimatedTimeMin + 15;

                const finalTime = totalTimeWithCooking >= 25 ? 25 : Math.round(totalTimeWithCooking);

                return {
                    ...vendor,
                    distance: Math.max(1, Math.round(distance * 10) / 10), // e.g., 6.3 km
                    estimatedTime: `${finalTime} `,
                };
            })
            .filter(Boolean)
            .sort((a, b) => (b.isOnline === true) - (a.isOnline === true)); // ✅ online vendors first

        return enrichedVendors;
    } catch (error) {
        console.error("Failed to fetch food vendors:", error.message || error);
        return []; // return empty array on failure
    }
}







// fetch nearest discounted vendors
// export async function getDiscountOfferFoodVendors() {
//     try {
//         const q = query(
//             collection(db, "users"),
//             where("role", "==", "Vendor"),
//             where("vendorType", "==", "Food/Restaurant"),
//             where("discountValue", ">", 0),
//             // where("location.lat", ">=", minLat),
//             // where("location.lat", "<=", maxLat),
//             // where("location.lng", ">=", minLng),
//             // where("location.lng", "<=", maxLng),
//             // limit(15)
//         );

//        const querySnapshot = await getDocs(q);
//         const vendors = querySnapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//         }));

//         const userLocation = await localforage.getItem("userLocation");
//         //  || { lat: 17.0193843, lng: 54.1107505 };
//         const enrichedVendors = vendors
//             ?.map((vendor) => {
//                 const loc = vendor.location;
//                 if (!loc?.lat || !loc?.lng) return null;

//                 const distance = getDistanceInKm(userLocation.lat, userLocation.lng, loc.lat, loc.lng);

//                 if (distance > MAX_DISTANCE_KM) return null;

//                 const estimatedTimeMin = Math.round((distance / AVERAGE_SPEED_KMPH) * 60);
//                 const totalTimeWithCooking = estimatedTimeMin + 15;

//                 const finalTime = totalTimeWithCooking >= 25 ? 25 : Math.round(totalTimeWithCooking);

//                 return {
//                     ...vendor,
//                     distance: Math.max(1, Math.round(distance * 10) / 10), // e.g., 6.3 km
//                     estimatedTime: `${finalTime} mins`,
//                 };
//             })
//             .filter(Boolean)
//             .sort((a, b) => (b.isOnline === true) - (a.isOnline === true)); // ✅ online vendors first

//         return enrichedVendors;
//     } catch (error) {
//         console.error("Failed to fetch food vendors:", error.message || error);
//         return []; // return empty array on failure
//     }
// }


// fetchTopRatedFoodVendors :getdocs:
// export async function fetchTopRatedFoodVendors() {
//     try {
//         const usersRef = collection(db, "users");
//         const q = query(
//             usersRef,
//             where("role", "==", "Vendor"),
//             where("vendorType", "==", "Food/Restaurant"),
//             where("isTop", "==", true)
//         );
//         const querySnapshot = await getDocs(q);
//         const vendors = querySnapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//         }));
//         console.log(vendors, "ff");
//         // Sort vendors by isOnline: true first
//         const sortedFoodVendors = vendors.sort((a, b) => {
//             return (b.isOnline === true) - (a.isOnline === true);
//         });
//         console.log(sortedFoodVendors);
//         return sortedFoodVendors;
//     } catch (error) {
//         console.error("Error fetching top vendors:", error);
//         return [];
//     }
// }



