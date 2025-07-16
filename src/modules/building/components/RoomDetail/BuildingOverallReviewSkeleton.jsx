import React from "react";

const BuildingOverallReviewSkeleton = () => {
  return (
    <div className="flex flex-col items-center space-y-2 mt-18">
      {/* Animated Rating Icon Skeleton */}
      <div className="relative flex flex-col items-center animate-pulse">
        <div className="w-24 h-24 bg-gray-200 rounded-full mb-2" />
        <div className="w-10 h-6 bg-gray-300 rounded-md absolute bottom-2" />
      </div>

      {/* "Guest favourite" text */}
      <div className="w-36 h-5 bg-gray-200 rounded-md animate-pulse" />

      {/* Description */}
      <div className="w-64 h-4 bg-gray-100 rounded-md animate-pulse" />
    </div>
  );
};

export default BuildingOverallReviewSkeleton;
