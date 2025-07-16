import React from "react";

// Tailwind-only version (no external Skeleton lib)
const SkeletonBox = ({ className }) => (
  <div className={`bg-gray-200 animate-pulse ${className}`} />
);

const RoomTitleSkeleton = () => {
  return (
    <div className="space-y-1 mt-4">
      {/* Simulate the title */}
      <SkeletonBox className="h-6 w-3/4 rounded" />

      {/* Simulate the subtitle (bed/guest info) */}
      <SkeletonBox className="h-4 w-2/3 rounded" />
    </div>
  );
};

export default RoomTitleSkeleton;
