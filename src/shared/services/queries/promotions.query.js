import { useEffect } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { subscribeAllBanners, subscribeAllOffers } from "@/shared/services/firestore/PromotionalFirestore";

// banners hook
export function useGetAllBanners() {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ["banners"],
        queryFn: () => new Promise(() => {}), // subscription will update data
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    useEffect(() => {
        const unsubscribe = subscribeAllBanners(
            (docs) => queryClient.setQueryData(["banners"], docs),
            () => queryClient.setQueryData(["banners"], [])
        );

        return () => unsubscribe();
    }, [queryClient]);

    return query;
}

// offers hook (only active)
export function useGetAllOffers() {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ["offers", "active"],
        queryFn: () => new Promise(() => {}), // subscription will update data
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    useEffect(() => {
        const unsubscribe = subscribeAllOffers(
            (docs) => queryClient.setQueryData(["offers", "active"], docs),
            () => queryClient.setQueryData(["offers", "active"], [])
        );

        return () => unsubscribe();
    }, [queryClient]);

    return query;
}
