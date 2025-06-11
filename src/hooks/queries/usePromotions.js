import { useQuery } from "@tanstack/react-query";
import { fetchAllDocuments } from "../../firebase/fireStore/commonFirestore";

export function useGetAllBanners() {
    return useQuery({
        queryKey: ["banners"],
        queryFn: () => fetchAllDocuments("banners"),
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
}