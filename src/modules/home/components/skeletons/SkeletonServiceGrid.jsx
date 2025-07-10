import React from "react";

const SkeletonBox = ({ className }) => (
  <div className={`bg-gray-300 rounded-md animate-pulse ${className}`} />
);

const SkeletonServiceGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 w-full auto-rows-[150px] sm:auto-rows-[180px] lg:auto-rows-[220px]">
      
      {/* Food (large block) */}
      <SkeletonBox className="lg:col-span-2 lg:row-span-3" />

      {/* Grocery */}
      <SkeletonBox className="lg:row-span-3" />

      {/* Hotels & Apartments */}
      <SkeletonBox className="lg:row-span-2" />

      {/* Health & Beauty */}
      <SkeletonBox />

      {/* E-Shop */}
      <SkeletonBox />

      {/* Rent a Car */}
      <SkeletonBox />

      {/* Download */}
      <SkeletonBox />
    </div>
  );
};

export default SkeletonServiceGrid;
