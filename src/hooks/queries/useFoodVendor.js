
import { getVendorFoodsAndCategories } from "@/firebase/fireStore/foodVendorsFireStore";
import { useQuery } from "@tanstack/react-query";

//GetVendorFoodsAndCategories--(vendor page :vendoorId)
export function useGetVendorFoodsAndCategories(vendorId) {
    return useQuery({
        queryKey: ["vendorFoodsAndCategories",vendorId],
        queryFn: ()=>getVendorFoodsAndCategories(vendorId),
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        enabled: !!vendorId,
    });
}
