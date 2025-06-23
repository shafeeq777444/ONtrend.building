/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { Heart } from "lucide-react";
import { useToggleWishlist } from "@/hooksDemo/userMutation";
import { useState } from "react";

const FavoriteButton = ({ product, isLiked: initialLiked }) => {
  const [localLiked, setLocalLiked] = useState(initialLiked);
  const { mutate: toggleWishlist, isPending } = useToggleWishlist("user12");

  const handleClick = (e) => {
    e.stopPropagation();

    const previous = localLiked;
    setLocalLiked(!previous); // Optimistic UI update

    toggleWishlist(product, {
      onError: () => setLocalLiked(previous), // Revert if error
    });
  };

  return (
    <motion.button
      disabled={isPending}
      onClick={handleClick}
      whileTap={{ scale: 0.85 }}
      className={`absolute top-3 right-3 z-30 p-2 rounded-full shadow transition-all duration-150 ease-in 
        ${localLiked ? "bg-white" : "bg-white/30 hover:bg-red-50"}`}
      title={localLiked ? "Remove from Wishlist" : "Add to Wishlist"}
    >
      <motion.span
        key={localLiked ? "liked" : "not-liked"}
        initial={{ scale: 0.9 }}
        animate={{
          scale: [1.2, 1],
          x: localLiked ? [0, -2, 2, -2, 2, 0] : 0,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {localLiked ? (
          <FaHeart className="w-4 h-4 text-red-500" />
        ) : (
          <Heart className="w-4 h-4 text-white" />
        )}
      </motion.span>
    </motion.button>
  );
};

export default FavoriteButton;
