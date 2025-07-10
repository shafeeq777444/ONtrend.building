import { toggleToWishlist, fetchWishlist } from "@/lib/firebaseDemo/demofirestore";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useToggleWishlist(userId) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (product) => toggleToWishlist(userId, product),

        onSuccess: (result, product) => {
            const cacheKey = ["wishlist", userId];

            if (!product?.id) return;

            if (result?.action === "added") {
                queryClient.setQueryData(cacheKey, (oldData = []) => {
                    const alreadyExists = oldData.some((item) => item.id === product.id);
                    return alreadyExists ? oldData : [...oldData, product];
                });
                toast.success("Added to your wishlist");
            } else if (result?.action === "removed") {
                queryClient.setQueryData(cacheKey, (oldData = []) => oldData.filter((item) => item.id !== product.id));
                toast.success("Removed from wishlist");
            }
        },

        onError: (error) => {
            console.error("❌ Failed to update wishlist", error);
            toast.error("❌ Failed to update wishlist");
        },
    });
}

export function useWishlist(userId) {
    return useQuery({
        queryKey: ["wishlist", userId],
        queryFn: () => fetchWishlist(userId),
        enabled: !!userId, // ✅ Only run if userId is truthy
        staleTime: 1000 * 60 * 5, // ✅ Cache stays fresh for 5 minutes
        cacheTime: 1000 * 60 * 10,
    });
}
