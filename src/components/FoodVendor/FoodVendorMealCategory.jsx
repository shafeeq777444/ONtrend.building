import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { SlidersHorizontal } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, setSortOption, setVendorMealCategory } from '@/features/food/foodSlice';

const FoodVendorMealCategory = ({categories,selectedCategory}) => {
  const dispatch=useDispatch()

  const{searchTerm,sortOption}=useSelector(state=>state.food)
  const [showFilter, setShowFilter] = useState(false);




  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md relative">
      <div className="flex justify-between items-center mb-4">


        {/* Filter Icon */}
         <Input
        type="text"
        placeholder="Search "
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        className="mb-4"
      />
        <button
          onClick={() => setShowFilter(prev => !prev)}
          className="p-2 rounded-full hover:bg-gray-200"
        >
          <SlidersHorizontal size={20} />
        </button>
      </div>

     

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-3">
        {categories?.map((category, index) => (
          <button
            key={category + index}
            onClick={() => dispatch(setVendorMealCategory(category))}
            className={`px-4 py-2 rounded-full text-sm font-medium shadow 
              ${selectedCategory === category ? 'bg-black text-white' : 'bg-white text-black border'}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Filter Dropdown Panel */}
     {showFilter && (
  <div className="absolute top-16 right-4 bg-white border rounded-full shadow-lg p-1 z-10 w-64">
    <div className="flex items-center justify-between">
      <button
        onClick={() => dispatch(setSortOption('lowToHigh'))}
        className={`flex-1 py-2 text-sm font-medium rounded-l-full 
          ${sortOption === 'lowToHigh' ? 'bg-black text-white' : 'bg-white text-black'}`}
      >
        Low to High
      </button>
      <button
        onClick={() => dispatch(setSortOption(''))}
        className={`flex-1 py-2 text-sm font-medium 
          ${sortOption === '' ? 'bg-black text-white' : 'bg-white text-black'}`}
      >
        Default
      </button>
      <button
        onClick={() => dispatch(setSortOption('highToLow'))}
        className={`flex-1 py-2 text-sm font-medium rounded-r-full 
          ${sortOption === 'highToLow' ? 'bg-black text-white' : 'bg-white text-black'}`}
      >
        High to Low
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default FoodVendorMealCategory;
