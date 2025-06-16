import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { SlidersHorizontal } from 'lucide-react';

const FoodVendorMealCategory = () => {
  const categories = [
    'Pasta', 'Salad', 'Seafood', 'Soups',
    'Roasted Meats', 'Oven-Baked', 'Plant-Based', 'Rice',
    'Pasta', 'Salad', 'Seafood', 'Soups',
    'Roasted Meats', 'Oven-Baked', 'Plant-Based', 'Rice'
  ];

  const [selectedCategory, setSelectedCategory] = useState('Pasta');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [sortOption, setSortOption] = useState('');
  const [preference, setPreference] = useState('');

  const filteredCategories = categories.filter(category =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 bg-gray-50 rounded-xl shadow-md relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Meal Category</h2>

        {/* Filter Icon */}
        <button
          onClick={() => setShowFilter(prev => !prev)}
          className="p-2 rounded-full hover:bg-gray-200"
        >
          <SlidersHorizontal size={20} />
        </button>
      </div>

      <Input
        type="text"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-3">
        {filteredCategories.map((category, index) => (
          <button
            key={category + index}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium shadow 
              ${selectedCategory === category ? 'bg-black text-white' : 'bg-white text-black border'}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Filter Dropdown Panel */}
      {showFilter && (
        <div className="absolute top-16 right-4 bg-white border rounded-lg shadow-lg p-4 z-10 w-64">
          <h4 className="font-medium mb-2">Sort By</h4>
          <div className="space-y-2 mb-4">
            <label className="block">
              <input
                type="radio"
                name="sort"
                value="lowToHigh"
                checked={sortOption === 'lowToHigh'}
                onChange={() => setSortOption('lowToHigh')}
                className="mr-2"
              />
              Price: Low to High
            </label>
            <label className="block">
              <input
                type="radio"
                name="sort"
                value="highToLow"
                checked={sortOption === 'highToLow'}
                onChange={() => setSortOption('highToLow')}
                className="mr-2"
              />
              Price: High to Low
            </label>
            <label className="block">
              <input
                type="radio"
                name="sort"
                value="rating"
                checked={sortOption === 'rating'}
                onChange={() => setSortOption('rating')}
                className="mr-2"
              />
              Rating: High to Low
            </label>
          </div>

          <h4 className="font-medium mb-2">Preference</h4>
          <div className="space-y-2">
            <label className="block">
              <input
                type="radio"
                name="preference"
                value="veg"
                checked={preference === 'veg'}
                onChange={() => setPreference('veg')}
                className="mr-2"
              />
              Veg
            </label>
            <label className="block">
              <input
                type="radio"
                name="preference"
                value="nonveg"
                checked={preference === 'nonveg'}
                onChange={() => setPreference('nonveg')}
                className="mr-2"
              />
              Non-Veg
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodVendorMealCategory;
