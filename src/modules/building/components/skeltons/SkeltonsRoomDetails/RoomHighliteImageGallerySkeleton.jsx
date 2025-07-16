import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Optional: Tailwind fallback if you're not using `react-loading-skeleton`
const SkeletonBox = ({ className }) => (
  <div className={`bg-gray-200 animate-pulse ${className}`} />
);

const RoomHighliteImageGallerySkeleton = () => {
  return (
    <>
      {/* 👉 Mobile View: Swiper-style Skeleton */}
      <div className="block lg:hidden mt-10 relative pb-6">
        <SkeletonBox className="w-full h-60 rounded-xl" />
      </div>

      {/* 👉 Desktop View: Grid layout */}
      <div className="hidden lg:grid mt-10 gap-3 grid-cols-4 grid-rows-2 h-[400px] rounded-md overflow-hidden">
        {/* Left Big Image Skeleton */}
        <SkeletonBox className="col-span-2 row-span-2 w-full h-full rounded-xl" />

        {/* Top Right Skeleton */}
        <SkeletonBox className="col-span-2 row-span-1 w-full h-full rounded-xl" />

        {/* Bottom Right - Two Skeletons */}
        <div className="col-span-2 row-span-1 grid grid-cols-2 gap-2">
          <SkeletonBox className="w-full h-full rounded-xl" />
          <SkeletonBox className="w-full h-full rounded-xl" />
        </div>
      </div>
    </>
  );
};

export default RoomHighliteImageGallerySkeleton;
