import React from "react";

const SkeltonDiscountedFoodCards = () => {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-md min-w-[220px] bg-white animate-pulse">
      {/* Image skeleton */}
      <div className="relative w-full aspect-[4/3] bg-gray-200" />

      {/* Bottom overlay content */}
      <div className="absolute bottom-4 left-3 flex items-start space-x-3 z-20">
        {/* Logo */}
        <div className="w-14 h-14 rounded-lg bg-gray-300 shadow-md" />

        {/* Text Info */}
        <div className="space-y-2 mt-1">
          <div className="h-3 w-32 bg-gray-300 rounded" />
          <div className="h-2 w-24 bg-gray-300 rounded" />
          <div className="h-2 w-20 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
};

export default SkeltonDiscountedFoodCards;
