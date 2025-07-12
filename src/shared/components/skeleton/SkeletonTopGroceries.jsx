import React from "react";
import {  FiShoppingBag } from "react-icons/fi";

const SkeletonTopGroceries = () => {
  return (
    <div className="px-4 py-6">
        {/* heading */}
            <div className="h-6 w-40 ml-4 bg-gray-200 rounded mb-6 animate-pulse" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="p-2">
            <div className="bg-white rounded-md shadow p-3 flex flex-col items-center text-center animate-pulse">
              {/* Image Skeleton */}
              <div className="w-full h-32 relative rounded-md overflow-hidden mb-3 bg-gray-200 flex items-center justify-center">
                 <FiShoppingBag className="text-gray-400 text-4xl" />
              </div>
              {/* Name Skeleton */}
              <div className="h-4 w-2/3 bg-gray-200 rounded mb-2"></div>
              {/* Button Skeleton */}
              <div className="h-8 w-full bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonTopGroceries;
