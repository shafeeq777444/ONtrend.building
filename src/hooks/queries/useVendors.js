import { useQuery } from "@tanstack/react-query";
import {  fetchAllTopVendors } from "../../firebase/fireStore/vendorsFirestore";



//getAllVendors(food,pharmcy,grocery,...)

//getAllTopVendors--(Top).....(food,pharmcy,grocery,...)
export function useGetAllTopVendors() {
    return useQuery({
        queryKey: ["topVendors"],
        queryFn: fetchAllTopVendors,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
}
