import React from "react";

const SkeletonBox = ({ className }) => (
  <div className={`bg-gray-200 animate-pulse ${className}`} />
);

const BuildingBookingSideBarSkeleton = () => {
  return (
    <div className="w-full max-w-sm pb-14 px-2 pt-2 rounded-xl border shadow-sm bg-white space-y-4 sticky top-40">
      {/* 🔘 Date Selector Skeleton */}
      <div>
        <SkeletonBox className="h-14 rounded-lg w-full" />
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gray-200 my-2" />

      {/* 👥 Guest Selector Skeleton */}
      <div>
        <SkeletonBox className="h-14 rounded-lg w-full" />
      </div>

      {/* 👤 Guest Modal Placeholder (hidden in skeleton) */}

      {/* 🏷️ Special Rate Skeleton */}
      <div className="space-y-2">
        <SkeletonBox className="h-4 w-1/2 rounded" />
        <SkeletonBox className="h-4 w-2/3 rounded" />
      </div>

      {/* 💰 Pricing Row */}
      <div className="flex justify-between items-center text-sm font-semibold text-gray-700">
        <SkeletonBox className="h-4 w-1/4 rounded" />
        <SkeletonBox className="h-4 w-16 rounded" />
      </div>

      {/* 🧾 Reserve Button */}
      <SkeletonBox className="h-10 w-full rounded-md" />
    </div>
  );
};

export default BuildingBookingSideBarSkeleton;
