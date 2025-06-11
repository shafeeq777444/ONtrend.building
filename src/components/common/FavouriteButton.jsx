/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

const FavoriteButton = ({ isLiked, onToggle }) => {
  return (
    <motion.button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className="absolute top-3 right-3 z-30 bg-white p-2 rounded-full shadow scale-95 hover:bg-red-50"
      whileTap={{ scale: 0.8 }}
    >
      <motion.span
        key={isLiked ? "liked" : "not-liked"}
        initial={{ scale: 0.9 }}
        animate={{
          scale: [1.2, 1],
          x: isLiked ? [0, -3, 3, -3, 3, 0] : 0, // 👈 shake when liked
          color: isLiked ? "#ef4444" : "#4b5563", // 👈 red or gray
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}
      >
        {isLiked ? (
          <FaHeart className="w-5 h-5" />
        ) : (
          <FiHeart className="w-5 h-5" />
        )}
      </motion.span>
    </motion.button>
  );
};

export default FavoriteButton;
