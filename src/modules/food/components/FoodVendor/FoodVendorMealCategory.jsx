import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/shared/components/ui/input";
import { SlidersHorizontal, Search } from "lucide-react";
import { setSearchTerm, setVendorMealCategory } from "@/shared/slices/food/foodSlice";
import SkeletonCategoryTabs from "@/shared/components/skeleton/SkeltonVendorFoodCategories";
import { AnimatePresence, motion } from "framer-motion";
import Filter from "../Filter";

const FoodVendorMealCategory = ({
  categories = [],
  selectedCategory,
  isLoading,
  isOnline,
  setCurrentPageIndex
}) => {
  const dispatch = useDispatch();
  const { searchTerm, sortOption } = useSelector((state) => state.food);
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const [showFilter, setShowFilter] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const filterRef = useRef(null);
  const filterButtonRef = useRef(null);
  const scrollRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (localSearch !== searchTerm) {
        dispatch(setSearchTerm(localSearch));
        setCurrentPageIndex(0);
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [localSearch, searchTerm, dispatch, setCurrentPageIndex]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!filterRef.current?.contains(e.target) && !filterButtonRef.current?.contains(e.target)) {
        setShowFilter(false);
      }
    };
    if (showFilter) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFilter]);

  const handleSearchIconClick = useCallback(() => {
    setIsSearchExpanded(true);
    setTimeout(() => searchInputRef.current?.focus(), 150);
  }, []);

  const handleSearchBlur = () => {
    if (!localSearch.trim()) setIsSearchExpanded(false);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsSearchExpanded(false);
      setLocalSearch("");
      dispatch(setSearchTerm(""));
    }
  };

  const handleCategoryClick = useCallback((category) => {
    dispatch(setVendorMealCategory(category));
    setCurrentPageIndex(0);
  }, [dispatch, setCurrentPageIndex]);

  const categoryButtons = useMemo(() =>
    categories.map((category, i) => {
      const isSelected = selectedCategory === category;
      return (
        <button
          key={category + i}
          onClick={() => handleCategoryClick(category)}
          className={`snap-start flex-shrink-0 px-6 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-all duration-200
            ${isSelected ? "text-white bg-black shadow-lg" : "text-gray-700 bg-gray-100 hover:bg-gray-200"}
            ${!isOnline ? "opacity-60 grayscale" : ""}
          `}
        >
          {category}
        </button>
      );
    }), [categories, selectedCategory, handleCategoryClick, isOnline]
  );

  if (isLoading) return <SkeletonCategoryTabs />;

  return (
    <div className="relative p-4 rounded-2xl bg-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Menu</h2>
        <div className="flex items-center gap-2">
          <AnimatePresence mode="wait">
            {!isSearchExpanded ? (
              <motion.button
                key="search-icon"
                onMouseDown={handleSearchIconClick}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl"
              >
                <Search size={20} className="text-gray-600" />
              </motion.button>
            ) : (
              <motion.div
                key="search-input"
                initial={{ opacity: 0, width: 40 }}
                animate={{ opacity: 1, width: 250 }}
                exit={{ opacity: 0, width: 40 }}
                transition={{ duration: 0.3 }}
              >
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search meals..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  onBlur={handleSearchBlur}
                  onKeyDown={handleSearchKeyDown}
                  className="w-full px-4 border rounded-xl"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <button
            ref={filterButtonRef}
            onClick={() => setShowFilter((prev) => !prev)}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl"
          >
            <SlidersHorizontal size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showFilter && (
          <motion.div
            ref={filterRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-10 right-4 border rounded-xl shadow-md z-20"
          >
            <Filter
              setCurrentPageIndex={setCurrentPageIndex}
              showFilter={showFilter}
              setShowFilter={setShowFilter}
              sortOption={sortOption}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-2 overflow-x-auto scrollbar-hide" ref={scrollRef}>
        <div className="flex gap-3">{categoryButtons}</div>
      </div>
    </div>
  );
};

export default React.memo(FoodVendorMealCategory);
