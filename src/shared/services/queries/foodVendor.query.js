

import { getVendorFoodCategories, getVendorFoodsPaginated } from "@/lib/firebase/fireStore/foodVendorsFireStore";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

// vender included categories
export function useVendorFoodCategories(vendorId) {
  return useQuery({
    queryKey: ["vendorFoodCategories", vendorId],
    queryFn: () => getVendorFoodCategories(vendorId),
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!vendorId,
  });
}

//GetVendorFoodsAndCategories--(vendor page :vendoorId) with pagination
export function useGetVendorFoodsAndCategories(vendorId, selectedCategory = "All") {
  return useInfiniteQuery({
    queryKey: ["vendorFoodsPaginated", vendorId, selectedCategory],
    queryFn: ({ pageParam = null }) =>
      getVendorFoodsPaginated(vendorId, 12, pageParam, selectedCategory),
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.lastVisible : undefined,
    enabled: !!vendorId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}


