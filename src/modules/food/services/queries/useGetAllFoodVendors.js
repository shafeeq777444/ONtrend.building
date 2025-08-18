import { useEffect } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { subscribeFoodVendors } from "../firebase/subscribeFoodVendors";


export function useGetAllFoodVendors(lat, lng) {
  const queryClient = useQueryClient();

  // Setup query (initial empty data)
  const query = useQuery({
    queryKey: ["foodVendors", lat, lng],
    queryFn: () => Promise.resolve([]), // empty initial fetch
    enabled: !!lat && !!lng,
    staleTime: Infinity,
    cacheTime: 10 * 60 * 1000,
  });

  // Firestore live subscription
  useEffect(() => {
    if (!lat || !lng) return;

    const unsubscribe = subscribeFoodVendors(
      lat,
      lng,
      (vendors) => {
        queryClient.setQueryData(["foodVendors", lat, lng], vendors);
      },
      (error) => {
        queryClient.setQueryData(["foodVendors", lat, lng], []);
      }
    );

    return () => unsubscribe();
  }, [lat, lng, queryClient]);

  return query;
}
