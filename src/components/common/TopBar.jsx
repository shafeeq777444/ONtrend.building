/* eslint-disable react-hooks/exhaustive-deps */
import { FiMapPin, FiSearch } from "react-icons/fi";
import {  FiChevronDown } from "react-icons/fi";
import { FaTicketAlt } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useEffect, useState } from "react";

export default function TopBar({ place = "San Francisco", cartCount = 2 }) {
   const [placeholderIndex, setPlaceholderIndex] = useState(0);
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
    }, 3000); // change every 3 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full z-50 h-20  px-4 py-2 flex items-center justify-between gap-2 md:gap-4">
      {/* Location */}
      <div className="flex items-center space-x-1 text-sm text-gray-700 font-medium">
  <FiMapPin className="text-red-500" />
  <span className="text-white">{place}</span>
  <FiChevronDown className="text-white" />
</div>

      {/* Search */}
      <div className="flex-1 mx-2 bg-white rounded-md">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={placeholders[placeholderIndex]}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
      </div>

      {/* Reward & Cart */}
      <div className="flex items-center space-x-4">
        {/* Reward icon */}
        <FaTicketAlt className="text-white text-lg cursor-pointer" title="Rewards" />

        {/* Cart with count */}
        <div className="relative cursor-pointer">
          <HiOutlineShoppingCart className="text-white text-xl" title="Cart" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
