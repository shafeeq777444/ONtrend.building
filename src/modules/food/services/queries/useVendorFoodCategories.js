// --- React Query Hook ---
import { useEffect } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { subscribeVendorFoodCategories } from "../firebase/subscribeVendorFoodCategories";
export function useVendorFoodCategories(vendorId) {
    const queryClient = useQueryClient();

    // useQuery just for caching + initial data
    const query = useQuery({
        queryKey: ["vendorFoodCategories", vendorId],
        queryFn: () => Promise.resolve(["All"]), // no fetch, live subscription drives updates
        staleTime: Infinity, // never stale, subscription drives updates
        enabled: !!vendorId,
    });

    useEffect(() => {
        if (!vendorId) return;

        const unsubscribe = subscribeVendorFoodCategories(
            vendorId,
            (data) => {
                queryClient.setQueryData(["vendorFoodCategories", vendorId], data);
            },
            (err) => {
                queryClient.setQueryData(["vendorFoodCategories", vendorId], ["All"]);
                console.error("Error fetching categories:", err);
            }
        );

        return () => unsubscribe();
    }, [vendorId, queryClient]);

    return query;
}
