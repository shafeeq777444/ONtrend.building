import React from "react";

const SkeletonLine = ({ width = "w-full", height = "h-4" }) => (
  <div className={`bg-gray-200 rounded-md ${width} ${height} animate-pulse`} />
);

const BuildingLocationMapSkeleton = () => {
  return (
    <div className="mt-10 px-4">
      {/* Heading */}
      <SkeletonLine width="w-1/3" height="h-6" />
      <SkeletonLine width="w-1/2" height="h-4" className="mt-2" />

      {/* Map Container Placeholder */}
      <div className="relative mt-6 rounded-3xl overflow-hidden border border-gray-200 shadow-md w-[72vw] h-[400px] bg-gray-100 animate-pulse">
        {/* Zoom Controls Placeholder */}
        <div className="absolute top-20 left-4 flex flex-col gap-2 z-10">
          <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />
          <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />
        </div>

        {/* Google Maps Button Placeholder */}
        <div className="absolute bottom-8 left-4 w-10 h-10 rounded-full bg-gray-300 animate-pulse z-10" />
      </div>
    </div>
  );
};

export default BuildingLocationMapSkeleton;
