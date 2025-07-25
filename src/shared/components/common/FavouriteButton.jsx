/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/lib/firebase/config";
import { useToggleWishlist } from "@/shared/services/queries/wishlist.query";
const FavoriteButton = ({ product, isLiked: initialLiked, unlikeIconColor="text-white/90" }) => {
    const currentUserId = auth.currentUser?.uid;
  const [localLiked, setLocalLiked] = useState(initialLiked);
  const { mutate: toggleWishlist, isPending } = useToggleWishlist(currentUserId);
  const navigate=useNavigate()

  const handleClick = (e) => {
    

    e.stopPropagation();
     if (!auth.currentUser) {
      navigate("/auth");
      return;
    }

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
      whileHover={{ scale: 1.1 }} // 🔁 Subtle zoom on hover
       transition={{ type: "spring", stiffness: 600, damping: 40 }}
      className={`absolute top-3 right-3 z-30 p-2 rounded-full shadow-md backdrop-blur
        transition-all duration-300 ease-in-out 
        ${
          localLiked
            ? "bg-white hover:bg-red-100"
            : "bg-white/60 hover:bg-white/40"
        }`}
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
          <FaHeart className={`w-4 h-4  ${unlikeIconColor}`} />
        )}
      </motion.span>
    </motion.button>
  );
};

export default FavoriteButton;
