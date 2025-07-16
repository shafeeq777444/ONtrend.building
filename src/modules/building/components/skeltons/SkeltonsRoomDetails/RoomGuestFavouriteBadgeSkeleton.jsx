import React from "react";

// Tailwind-only animated skeleton box
const SkeletonBox = ({ className }) => (
  <div className={`bg-gray-200 animate-pulse ${className}`} />
);

const RoomGuestFavouriteBadgeSkeleton = () => {
  return (
    <div className="mt-6 rounded-2xl border border-gray-200 px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 shadow-sm max-w-4xl">
      {/* 🛡️ Badge Section */}
      <div className="flex items-start sm:items-center gap-3 flex-1">
        <SkeletonBox className="w-12 h-12 rounded-full" />
        <div className="space-y-1">
          <SkeletonBox className="h-4 w-40 rounded" />
          <SkeletonBox className="h-3 w-56 rounded" />
        </div>
      </div>

      {/* ⭐ Rating Section */}
      <div className="text-center sm:border-l sm:pl-6 sm:border-gray-300 space-y-1">
        <SkeletonBox className="h-4 w-10 mx-auto rounded" />
        <div className="flex justify-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonBox key={i} className="h-3 w-3 rounded-full" />
          ))}
        </div>
      </div>

      {/* 📝 Reviews Section */}
      <div className="text-center sm:border-l sm:pl-6 sm:border-gray-300 space-y-1">
        <SkeletonBox className="h-4 w-8 mx-auto rounded" />
        <SkeletonBox className="h-3 w-12 mx-auto rounded" />
      </div>
    </div>
  );
};

export default RoomGuestFavouriteBadgeSkeleton;
