import React from "react";

const SkeletonBox = ({ className }) => (
  <div className={`bg-gray-200 animate-pulse ${className}`} />
);

const BuildingAmenitiesSkeleton = ({ isArabic = false }) => {
  return (
    <>
      {/* Title Skeleton */}
      <div className="px-4 py-2">
        <SkeletonBox className="h-6 w-40 rounded" />
      </div>

      {/* Grid Skeleton */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 md:max-w-4xl p-6 ${
          isArabic ? "text-right" : "text-left"
        }`}
      >
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 p-3 bg-gray-50 rounded-lg ${
              isArabic ? "flex-row-reverse" : ""
            }`}
          >
            {/* Icon Skeleton */}
            <SkeletonBox className="w-10 h-10 rounded-full flex-shrink-0" />

            {/* Text Skeleton */}
            <div className="flex-1">
              <SkeletonBox className="h-4 w-24 rounded" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BuildingAmenitiesSkeleton;
