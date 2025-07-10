import React, { useState, useMemo, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { FiSearch } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { useGetAllFoodVendors } from "@/shared/services/queries/vendors.query";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import localforage from "localforage";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
      const name = isArabic
        ? vendor.restaurantArabicName || ""
        : vendor.restaurantName || "";
      return name.toLowerCase().includes(search.toLowerCase());
    });
  }, [vendors, search, isArabic]);

  const showVendors = filteredVendors.slice(0, 9);

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel
              as={motion.div}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full max-w-4xl bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-xl relative"
            >
              {/* Search and Close */}
              <div className="flex justify-between items-center mb-4 gap-4">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder={isArabic ? "ابحث عن البائع" : "Search vendors"}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none  dark:bg-zinc-800 dark:text-white"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                {/* Close Button */}
                {/* <motion.button
                  onClick={handleClose}
                  whileHover={{ scale: 1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-200 dark:bg-zinc-700 text-black dark:text-white p-2 rounded-full hover:bg-gray-300 dark:hover:bg-zinc-600 transition"
                  aria-label="Close"
                >
                  <X className="w-2 h-2" />
                </motion.button> */}
              </div>

              {/* Search History */}
              {searchHistory.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {searchHistory.map((item, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setSearch(item)}
                    //   whileHover={{ scale: 1.05 }}
                      className="bg-gray-200 dark:bg-zinc-700 text-sm px-3 py-1 rounded-full hover:bg-blue-100 dark:hover:bg-zinc-600 transition"
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Vendor Cards */}
              {isLoading ? (
                <p className="text-center text-gray-500">
                  {isArabic ? "جاري تحميل البائعين..." : "Loading vendors..."}
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {showVendors.map((vendor) => (
                    <motion.div
                      key={vendor.id}
                      onClick={() => {
                        navigate(`/food/${vendor.id}`);
                        handleClose();
                      }}
                    //   whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="flex items-center gap-4 p-4 bg-gray-100 hover:bg-white hover:border-0 duration-200 ease-in transition-all dark:bg-zinc-800 rounded-lg shadow-sm cursor-pointer"
                    >
                      <img
                        src={vendor.image || "https://via.placeholder.com/80"}
                        alt={
                          isArabic
                            ? vendor.restaurantArabicName
                            : vendor.restaurantName
                        }
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg dark:text-white">
                          {isArabic
                            ? vendor.restaurantArabicName
                            : vendor.restaurantName}
                        </h3>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {vendor.distance?.toFixed(1) || "?"} km •{" "}
                          {vendor.estimatedTime || "?"} min
                        </div>
                        {/* <div className="flex items-center text-yellow-500 text-sm">
                          <FaStar className="mr-1" />
                          {(vendor.Ratings / vendor.totalRatings || 0).toFixed(1)}
                        </div> */}
                      </div>
                    </motion.div>
                  ))}
                  {showVendors.length === 0 && (
                    <p className="text-center text-gray-500 col-span-full">
                      {isArabic
                        ? "لم يتم العثور على بائعين."
                        : "No vendors found."}
                    </p>
                  )}
                </div>
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
