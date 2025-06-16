import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
    fetchAllFoodVendors,
    fetchAllTopVendors,
    // getNearbyDiscountOfferVendors,
} from "../../firebase/fireStore/vendorsFirestore";
import { useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";

//getAllVendors(food,pharmcy,grocery,...)

//getAllTopVendors--(Top).....(food,pharmcy,grocery,...) [used://home page //foodpage-firstHalf]  
export function useGetAllTopVendors(lat, lng) {
    return useQuery({
        queryKey: ["topVendors"],
        queryFn: fetchAllTopVendors,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        enabled: !!lat && !!lng,
    });
}

//getAllFood/RestuarentVendors [use://fode last component,food inside]
export function useGetAllFoodVendors(lat, lng) {
    return useQuery({
        queryKey: ["foodVendors"],
        queryFn: fetchAllFoodVendors,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        enabled: !!lat && !!lng,
    });
}

// getNearest Discount Provided Vendors
// export function useGetNearestDiscountedVendors(lat, lng) {
//     console.log(lat, "hook worked");
//     return useQuery({
//         queryKey: ["nearestDiscountedVendors", lat, lng],
//         queryFn: () => getNearbyDiscountOfferVendors(lat, lng),
//         //  enabled: !!lat && !!lng,
//         staleTime: 5 * 60 * 1000,
//         cacheTime: 10 * 60 * 1000,
//         refetchOnWindowFocus: false,
//     });
// }

// topRated foods
// export function useGetNearestTopRatededVendors(lat,lng) {
//     console.log(lat,'hook worked')
//     return useQuery({
//         queryKey: ["nearestDiscountedVendors",lat,lng],
//         queryFn: ()=>getNearbyDiscountOfferVendors(lat,lng),
//          enabled: !!lat && !!lng,
//         staleTime: 5 * 60 * 1000,
//         cacheTime: 10 * 60 * 1000,
//         refetchOnWindowFocus: false,
//     });
// }

// topRated foods
// export function useGetTopRatededFoodVendors() {

//     return useQuery({
//         queryKey: ["topRatedFoodVendors"],
//         queryFn: fetchTopRatedFoodVendors,
//         staleTime: 5 * 60 * 1000,
//         cacheTime: 10 * 60 * 1000,
//         refetchOnWindowFocus: false,
//     });
// }

export function useGetNewVendors() {
    const queryClient = useQueryClient();

    useEffect(() => {
        const q = query(collection(db, "users"), where("role", "==", "Vendor"), where("isApproved", "==", true));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const sorted = data.sort((a, b) => (b.isOnline === true) - (a.isOnline === true));

            // Update React Query cache manually
            queryClient.setQueryData(["topVendors"], sorted);
        });

        return () => unsubscribe();
    }, [queryClient]);

    // Get data from cache (and optionally use a fallback fetch function)
    return useQuery({
        queryKey: ["topVendors"],
        queryFn: fetchAllTopVendors, // fallback for SSR/initial
        enabled: false, // disable automatic fetch
    });
}
