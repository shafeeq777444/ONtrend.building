import React from "react";

// Tailwind-only skeleton block
const SkeletonBox = ({ className }) => (
  <div className={`bg-gray-200 animate-pulse ${className}`} />
);

const BuildingDescriptionSkeleton = ({ isArabic = false }) => {
  return (
    <div
      className={`m-4 p-4 rounded-xl text-sm leading-relaxed ${
        isArabic ? "text-right" : "text-left"
      }`}
    >
      <div className="space-y-2">
        <SkeletonBox className="h-3 w-full rounded" />
        <SkeletonBox className="h-3 w-5/6 rounded" />
        <SkeletonBox className="h-3 w-2/3 rounded" />
        <SkeletonBox className="h-3 w-1/2 rounded" />
      </div>
    </div>
  );
};

export default BuildingDescriptionSkeleton;
