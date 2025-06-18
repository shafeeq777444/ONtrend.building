import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { SlidersHorizontal } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearchTerm,
  setSortOption,
  setVendorMealCategory
} from '@/features/food/foodSlice';
import Filter from '../Filter';

const FoodVendorMealCategory = ({ categories, selectedCategory }) => {
  const dispatch = useDispatch();
  const { searchTerm, sortOption } = useSelector(state => state.food);
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef(null);
  const filterButtonRef = useRef(null);

  // Close filter modal on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target) && filterButtonRef && !filterButtonRef.current.contains(event.target) ) {
        setShowFilter(false);
      }
    };

    if (showFilter) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilter]);

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md relative">
      {/* Search & Filter Header */}
      <div className="flex justify-between items-center py-2 gap-2">
        <Input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          className="w-full"
        />
        <button
        ref={filterButtonRef}
          onClick={() => setShowFilter(prev => !prev)}
          className="p-2 rounded-full hover:bg-gray-200"
        >
          <SlidersHorizontal size={20} />
        </button>
      </div>

      {/* Categories */}
      <h1 className="mb-2 font-semibold">Categories</h1>
      <div className="flex sm:flex-wrap flex-nowrap gap-3 overflow-x-auto sm:overflow-x-visible scrollbar-hide">
        {categories?.map((category, index) => (
          <button
            key={category + index}
            onClick={() => dispatch(setVendorMealCategory(category))}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium shadow transition 
              ${selectedCategory === category
                ? 'bg-black text-white'
                : 'bg-white text-black border'
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Floating Filter Modal */}
      {showFilter && (
        <div
          ref={filterRef}
          className="absolute top-0 right-0 w-64 bg-white  rounded-xl  z-25 transition-all animate-fade-in"
        >
          <Filter
            showFilter={showFilter}
            setShowFilter={setShowFilter}
            sortOption={sortOption}
          />
        </div>
      )}
    </div>
  );
};

export default FoodVendorMealCategory;
