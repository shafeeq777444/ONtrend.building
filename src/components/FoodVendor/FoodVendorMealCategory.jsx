import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { SlidersHorizontal, Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, setVendorMealCategory } from '@/features/food/foodSlice';
import Filter from '../Filter';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from 'framer-motion';
import SkeletonCategoryTabs from '../skeleton/SkeltonVendorFoodCategories';

const FoodVendorMealCategory = ({ categories, selectedCategory,isLoading }) => {
  const dispatch = useDispatch();
  const { searchTerm, sortOption } = useSelector(state => state.food);
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const [showFilter, setShowFilter] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const filterRef = useRef(null);
  const filterButtonRef = useRef(null);
  const scrollRef = useRef(null);
  const searchInputRef = useRef(null);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      if (localSearch !== searchTerm) {
        dispatch(setSearchTerm(localSearch));
      }
    }, 400);
    return () => clearTimeout(handler);
  }, [localSearch]);

  // Close filter on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(e.target) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(e.target)
      ) {
        setShowFilter(false);
      }
    };
    if (showFilter) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showFilter]);

  // Scroll handlers (now with auto behavior to prevent stuck effect)
  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -200, behavior: 'auto' });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 200, behavior: 'auto' });

  // Expand search
  const handleSearchIconClick = () => {
    setIsSearchExpanded(true);
    setTimeout(() => searchInputRef.current?.focus(), 150);
  };

  const handleSearchBlur = () => {
    if (!localSearch.trim()) {
      setIsSearchExpanded(false);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsSearchExpanded(false);
      setLocalSearch('');
      dispatch(setSearchTerm(''));
    }
  };
  if(isLoading){
    return(<SkeletonCategoryTabs/>)
  }

  return (
    <div className="relative p-4 rounded-2xl bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Menu</h2>

        <div className="flex items-center gap-2">
          <div className="relative">
            <AnimatePresence mode="wait">
              {!isSearchExpanded ? (
                <motion.button
                  key="search-icon"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
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
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
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
          </div>

          {/* Filter Button */}
          <button
            ref={filterButtonRef}
            onClick={() => setShowFilter((prev) => !prev)}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl"
          >
            <SlidersHorizontal size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Filter Modal */}
      <AnimatePresence>
        {showFilter && (
          <motion.div
            ref={filterRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-10 right-4  border rounded-xl shadow-md z-20"
          >
            <Filter
              showFilter={showFilter}
              setShowFilter={setShowFilter}
              sortOption={sortOption}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Categories */}
      <div className="relative mt-2">
        <div className="flex items-center">

          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-scroll snap-x snap-mandatory px-2 py-2 scrollbar-hide"
          >
            {categories?.map((category, index) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category + index}
                  onClick={() => dispatch(setVendorMealCategory(category))}
                  className={`snap-start flex-shrink-0 px-6 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    isSelected
                      ? 'text-white bg-black shadow-lg'
                      : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodVendorMealCategory;
