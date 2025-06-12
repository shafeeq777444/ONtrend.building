import React from 'react';

const GroceryGridCard = () => {
  return (
    <div className="relative group w-full h-full cursor-pointer overflow-hidden rounded-lg shadow-md">
      {/* Image */}
      <img
        className="w-full h-full object-cover"
        src="/gird/grocesory.jpg"
        alt="Grocery"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 bg-opacity-30 group-hover:bg-opacity-50 transition duration-300" />

      {/* Text on top */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
        <h3 className="text-2xl font-semibold mb-2">Fresh Groceries</h3>
        <p className="opacity-0 group-hover:opacity-100 text-sm transition duration-700 delay-100">
          Get the best quality groceries delivered to your doorstep!
        </p>
      </div>
    </div>
  );
};

export default GroceryGridCard;
