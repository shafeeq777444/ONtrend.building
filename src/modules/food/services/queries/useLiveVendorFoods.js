// src/hooks/useLiveVendorFoods.js
import { useEffect } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { subscribeVendorFoodsPaginated } from "../firebase/subscribeVendorFoodsPaginated";


export function useLiveVendorFoods(vendorId, selectedCategory = "All") {
  const queryClient = useQueryClient();

  const query = useInfiniteQuery({
    queryKey: ["vendorFoodsPaginated", vendorId, selectedCategory],
    queryFn: () => new Promise(() => {}), // snapshot drives updates
    getNextPageParam: (lastPage) =>
      lastPage?.hasMore ? lastPage.lastVisible : undefined,
    enabled: !!vendorId,
    staleTime: Infinity,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!vendorId) return;

    const unsubscribe = subscribeVendorFoodsPaginated(
      vendorId,
      12,
      null, // first page only live
      selectedCategory,
      (data) => {
        queryClient.setQueryData(
          ["vendorFoodsPaginated", vendorId, selectedCategory],
          (old) => {
            if (!old) {
              return { pages: [data], pageParams: [null] };
            }
            return {
              pages: [data, ...old.pages.slice(1)], // replace first page live
              pageParams: old.pageParams,
            };
          }
        );
      },
      (err) => console.error(err)
    );

    return () => unsubscribe();
  }, [vendorId, selectedCategory, queryClient]);

  return query;
}
