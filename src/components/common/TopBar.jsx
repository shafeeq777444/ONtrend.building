/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { FiMapPin, FiSearch, FiChevronDown, FiUser, FiHeart } from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { PiGiftBold } from "react-icons/pi";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TopBar({ place = "San Francisco", cartCount = 2 }) {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const placeholders = [
    "Search for food, groceries, beauty, hotels...",
    "Hungry? Find yummy food or your favorite spot",
    "Need a ride? Try car rentals nearby",
    "Shop essentials from our E-Store",
    "Book hotels or apartments for your stay",
    "Find daily needs & fresh groceries",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 h-20 px-4 py-2 flex items-center justify-between gap-2 md:gap-4 transition-all duration-300 rounded-b-xl ${
  scrolled
    ? "bg-[rgba(255,48,48,0.96)] backdrop-blur-md shadow-md"
    : "backdrop-blur-xs"
}`}
    >
      {/* Location */}
      <div className="flex items-center space-x-1 text-sm font-medium text-white">
        <FiMapPin className="text-red-200" />
        <span>{place}</span>
        <FiChevronDown />
      </div>

      {/* Search */}
      <div className="flex-1 mx-2 bg-white rounded-md">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder=""
          />
          {/* Animated Placeholder Overlay */}
          <div className="absolute left-10 top-1/2 -translate-y-1/2 pointer-events-none text-sm text-gray-400">
            <AnimatePresence mode="wait">
              <motion.span
                key={placeholderIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.4 }}
              >
                {placeholders[placeholderIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-4">
        {[
          { Icon: PiGiftBold, title: "Rewards" },
          { Icon: FiHeart, title: "Wishlist" },
        ].map(({ Icon, title }, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.1 }}
            className="text-white text-lg cursor-pointer"
            title={title}
          >
            <Icon />
          </motion.div>
        ))}

        {/* Cart */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="relative cursor-pointer text-white"
          title="Cart"
        >
          <HiOutlineShoppingCart className="text-xl" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
              {cartCount}
            </span>
          )}
        </motion.div>

        {/* User */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="text-white text-lg cursor-pointer"
          title="Profile"
        >
          <FiUser />
        </motion.div>
      </div>
    </motion.div>
  );
}
