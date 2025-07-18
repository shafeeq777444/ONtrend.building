import { fetchAllDocuments } from "@/lib/firebase/fireStore/commonFirestore";
import { useQuery } from "@tanstack/react-query";


export function useGetAllBanners() {
    return useQuery({
        queryKey: ["banners"],
        queryFn: () => fetchAllDocuments("banners"),
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
}


export function useGetAllOffers() {
    return useQuery({
        queryKey: ["offers"],
        queryFn: () => fetchAllDocuments("offers"),
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
}
