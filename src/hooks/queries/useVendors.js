import { useQuery } from "@tanstack/react-query";
import {  fetchAllFoodVendors, fetchAllTopVendors } from "../../firebase/fireStore/vendorsFirestore";



//getAllVendors(food,pharmcy,grocery,...)

//getAllTopVendors--(Top).....(food,pharmcy,grocery,...) [used://home page //foodpage-firstHalf] 
export function useGetAllTopVendors() {
    return useQuery({
        queryKey: ["topVendors"],
        queryFn: fetchAllTopVendors,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
}

//getAllFood/RestuarentVendors [use://fode last component,food inside]
export function useGetAllFoodVendors() {
    return useQuery({
        queryKey: ["foodVendors"],
        queryFn: fetchAllFoodVendors,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
}