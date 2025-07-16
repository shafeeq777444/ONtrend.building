import React from "react";

const SkeletonLine = ({ width = "w-full", height = "h-4" }) => (
  <div className={`bg-gray-200 rounded-md ${width} ${height} animate-pulse`} />
);

const BuildingStayPoliciesSkeleton = () => {
  return (
    <div className="mt-6 mr-4 p-4 rounded-xl border bg-white shadow-sm space-y-6">
      {/* Header */}
      <SkeletonLine width="w-1/3" height="h-5" />

      {/* Check-in / Check-out */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="bg-gray-200 rounded-full w-5 h-5 animate-pulse" />
          <SkeletonLine width="w-1/2" />
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-gray-200 rounded-full w-5 h-5 animate-pulse" />
          <SkeletonLine width="w-1/2" />
        </div>
      </div>

      {/* Cancellation Policy */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="bg-gray-200 rounded-full w-5 h-5 animate-pulse" />
          <SkeletonLine width="w-32" />
        </div>
        <div className="space-y-2 mt-2">
          <SkeletonLine width="w-full" />
          <SkeletonLine width="w-5/6" />
          <SkeletonLine width="w-3/4" />
        </div>
        <div className="mt-2">
          <SkeletonLine width="w-24" height="h-3" />
        </div>
      </div>

      {/* Additional Rules */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="bg-gray-200 rounded-full w-5 h-5 animate-pulse" />
          <SkeletonLine width="w-36" />
        </div>
        <div className="space-y-2 mt-2">
          <SkeletonLine width="w-full" />
          <SkeletonLine width="w-5/6" />
          <SkeletonLine width="w-3/4" />
        </div>
        <div className="mt-2">
          <SkeletonLine width="w-24" height="h-3" />
        </div>
      </div>
    </div>
  );
};

export default BuildingStayPoliciesSkeleton;
