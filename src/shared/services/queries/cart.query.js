
import {  addToCart, getAllCartItems, removeFromCart, changeCartQuantity } from "@/lib/firebaseDemo/demofirestore";
import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query";
import toast from "react-hot-toast";

//------------------------    add cart (create/update)    ------------------------------------------------
export const useAddToCart = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product) => addToCart(userId, product),

    onSuccess: () => {
      queryClient.invalidateQueries(["cart", userId]);
      toast.success("Cart added successfully");
    },

    onError: (error) => {
      if (error.message === "You can only order from one vendor at a time.") {
        toast.error(error.message);
      } else {
        toast.error("Failed to add to cart.");
        console.error("Add to cart failed:", error);
      }
    },
  });
};


// ----------------------------------       update cart qunatity      ----------------------------------
export const useChangeCartQuantity = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cartId, delta }) => {
      if (!userId) throw new Error("User ID is required.");
      return changeCartQuantity(userId, cartId, delta);
    },

    // 🔄 Optimistic Update
    onMutate: async ({ cartId, delta }) => {
      await queryClient.cancelQueries(["cart", userId]);

      const previousCart = queryClient.getQueryData(["cart", userId]);

      queryClient.setQueryData(["cart", userId], (old = []) =>
        old.map((item) =>
          item.id === cartId
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
      );

      return { previousCart };
    },

    // ❌ Rollback on Error
    onError: (err, _variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart", userId], context.previousCart);
      }
      console.error("Failed to update cart quantity:", err.message);
    },

    // ✅ Always refetch after success or error
    onSettled: () => {
      queryClient.invalidateQueries(["cart", userId]);
    },
  });
};


// read All
export const useCartItems = (userId) => {
  return useQuery({
    queryKey: ["cart", userId],
    queryFn: () => getAllCartItems(userId),
    enabled: !!userId, // only fetch if userId exists
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    cacheTime: 1000 * 60 * 10
  });
};

// delete a specific product
export const useRemoveFromCart = (userId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId) => removeFromCart(userId, productId),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", userId]); // refresh the cart
    },
  });
};
