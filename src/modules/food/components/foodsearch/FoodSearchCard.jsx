import React, { useState, useMemo, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { FiSearch } from "react-icons/fi";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import localforage from "localforage";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useGetAllFoodVendors } from "../../services/queries/useGetAllFoodVendors";
import LazyImg from "@/shared/components/performanceOptimised/LazyImg";

const HISTORY_KEY = "vendorSearchHistory";
const MAX_HISTORY = 8;

export default function FoodSearchCard({ isOpen, onClose }) {
  const {
    location: { lat, lng },
  } = useSelector((state) => state.user);

  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [search, setSearch] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const navigate = useNavigate();

  // Load saved search history when modal opens
  useEffect(() => {
    if (isOpen) {
      localforage.getItem(HISTORY_KEY).then((saved = []) => {
        setSearchHistory(Array.isArray(saved) ? saved : []);
      });
    }
  }, [isOpen]);

  // Save new search term to history
  const saveSearchToHistory = async (term) => {
    const trimmed = term.trim();
    if (!trimmed) return;

    const existing = (await localforage.getItem(HISTORY_KEY)) || [];
    const filtered = existing.filter((item) => item !== trimmed);
    const updated = [trimmed, ...filtered].slice(0, MAX_HISTORY);

    await localforage.setItem(HISTORY_KEY, updated);
    setSearchHistory(updated);
  };

  const handleClose = async () => {
    if (search.trim()) {
      await saveSearchToHistory(search);
    }
    onClose();
  };

  const { data: vendors, isLoading } = useGetAllFoodVendors(lat, lng);

  // Optimized filtering
  const showVendors = useMemo(() => {
    if (!vendors) return [];
    const filtered = vendors.filter((vendor) => {
      const name = isArabic
        ? vendor.restaurantArabicName || ""
        : vendor.restaurantName || "";
      return name.toLowerCase().includes(search.toLowerCase());
    });
    return filtered.slice(0, 9);
  }, [vendors, search, isArabic]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onClose={handleClose} className="fixed inset-0 z-50 flex">
          {/* Overlay (lighter gradient instead of heavy blur for Brave perf) */}
          <motion.div
            className="fixed inset-0 bg-gradient-to-b from-black/40 to-black/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative ml-auto w-full max-w-md h-full bg-white dark:bg-zinc-900 flex flex-col shadow-xl"
          >
            {/* Header with Search */}
            <div className="flex items-center justify-between p-4 gap-2">
              <div className="relative flex-1">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-white" />
                <input
                  type="text"
                  placeholder={isArabic ? "ابحث عن البائع" : "Search vendors"}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-0"
                />
              </div>
              <button
                onClick={handleClose}
                className="ml-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-700 transition"
              >
                <ArrowRight className="w-5 h-5 text-gray-600 dark:text-white" />
              </button>
            </div>

            {/* Search History */}
            {searchHistory.length > 0 && (
              <div className="flex flex-wrap gap-2 p-4">
                {searchHistory.map((item, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSearch(item)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-gray-100 dark:bg-zinc-700 px-3 py-1 rounded-full text-sm text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-600 transition"
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Vendor List */}
            <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
              {isLoading ? (
                <p className="text-center text-gray-500 py-8">
                  {isArabic ? "جاري تحميل البائعين..." : "Loading vendors..."}
                </p>
              ) : (
                <div className="flex flex-col gap-3">
                  {showVendors.map((vendor) => (
                    <motion.div
                      key={vendor.id}
                      onClick={() => {
                        navigate(`/food/${vendor.id}`);
                        handleClose();
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="flex items-center gap-3 p-3 rounded-lg cursor-pointer bg-gray-50 dark:bg-zinc-800 hover:shadow-md hover:bg-gray-100 dark:hover:bg-zinc-700 transition"
                    >
                      <LazyImg
                        src={vendor.image || "https://via.placeholder.com/80"}
                        alt={isArabic ? vendor.restaurantArabicName : vendor.restaurantName}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white truncate">
                          {isArabic ? vendor.restaurantArabicName : vendor.restaurantName}
                        </h3>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {vendor.distance?.toFixed(1) || "?"} km • {vendor.estimatedTime || "?"} min
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {showVendors.length === 0 && (
                    <p className="text-center text-gray-500 py-8">
                      {isArabic ? "لم يتم العثور على بائعين." : "No vendors found."}
                    </p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
