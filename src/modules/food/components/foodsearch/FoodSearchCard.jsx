import React, { useState, useMemo, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { FiSearch } from "react-icons/fi";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import localforage from "localforage";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useGetAllFoodVendors } from "../../services/queries/useGetAllFoodVendors";
import LazyImg from "@/shared/components/LazyImg";

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

  useEffect(() => {
    if (isOpen) {
      localforage.getItem(HISTORY_KEY).then((saved = []) => {
        setSearchHistory(Array.isArray(saved) ? saved : []);
      });
    }
  }, [isOpen]);

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
    await saveSearchToHistory(search);
    onClose();
  };

  const { data: vendors, isLoading } = useGetAllFoodVendors(lat, lng);

  const filteredVendors = useMemo(() => {
    if (!vendors) return [];
    return vendors.filter((vendor) => {
      const name = isArabic ? vendor.restaurantArabicName || "" : vendor.restaurantName || "";
      return name.toLowerCase().includes(search.toLowerCase());
    });
  }, [vendors, search, isArabic]);

  const showVendors = filteredVendors.slice(0, 9);

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onClose={handleClose} className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative ml-auto w-full max-w-md h-full bg-white/30 dark:bg-zinc-900/30 backdrop-blur-md border-l border-white/20 dark:border-zinc-700/40 flex flex-col"
          >
            {/* Header with Search */}
            <div className="flex items-center justify-between p-4 border-b border-white/20 dark:border-zinc-700/40">
              <div className="relative flex-1">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800 dark:text-white" />
                <input
                  type="text"
                  placeholder={isArabic ? "ابحث عن البائع" : "Search vendors"}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/20 dark:bg-zinc-800/30 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handleClose}
                className="ml-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 transition"
              >
                <X className="w-5 h-5 text-gray-700 dark:text-white" />
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
                    whileTap={{ scale: 0.98 }}
                    className="bg-white/20 dark:bg-zinc-700/30 backdrop-blur-sm px-3 py-1 rounded-full text-sm hover:bg-white/40 dark:hover:bg-zinc-600/50 transition"
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Vendor List */}
            <div className="flex-1 overflow-y-auto p-4">
              {isLoading ? (
                <p className="text-center text-gray-500 py-8">
                  {isArabic ? "جاري تحميل البائعين..." : "Loading vendors..."}
                </p>
              ) : (
                <div className="flex flex-col gap-3 scrollbar-hide">
                  {showVendors.map((vendor) => (
                    <motion.div
                      key={vendor.id}
                      onClick={() => {
                        navigate(`/food/${vendor.id}`);
                        handleClose();
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="flex items-center gap-3 p-3 rounded-lg cursor-pointer bg-white/10 dark:bg-zinc-800/20 backdrop-blur-sm border border-white/20 dark:border-zinc-700/40 hover:shadow-md hover:bg-white/30 dark:hover:bg-zinc-800/30 transition"
                    >
                      <LazyImg
                        src={vendor.image || "https://via.placeholder.com/80"}
                        alt={isArabic ? vendor.restaurantArabicName : vendor.restaurantName}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base sm:text-lg dark:text-white truncate">
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
