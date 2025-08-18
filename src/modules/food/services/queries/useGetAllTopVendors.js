import { useEffect } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { subscribeTopVendors } from "../firebase/subscribeTopVendors";


export function useGetAllTopVendors(lat, lng) {
  const queryClient = useQueryClient();

  // dummy query so React Query gives you `isLoading`, `data`, `error`
  const query = useQuery({
    queryKey: ["topVendors", lat, lng],
    queryFn: () => Promise.resolve([]), 
    enabled: !!lat && !!lng,
    staleTime: Infinity, //not triger refetch, it known its always fresh
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!lat || !lng) return;

    const unsubscribe = subscribeTopVendors(
      lat,
      lng,
      (data) => {
        queryClient.setQueryData(["topVendors", lat, lng], data);
      },
      (err) => {
        queryClient.setQueryData(["topVendors", lat, lng], []);
        console.error("Error fetching top vendors:", err);
      }
    );

    return () => unsubscribe && unsubscribe();
  }, [lat, lng, queryClient]);

  return query;
}
