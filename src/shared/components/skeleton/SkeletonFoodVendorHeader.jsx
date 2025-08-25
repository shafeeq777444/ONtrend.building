import React from "react";

const SkeletonFoodVendorHeader = () => {
  return (
    <div className="relative w-full scrollbar-hide">
      <div className="relative w-full h-[300px] sm:h-[450px] md:h-[400px] lg:h-[450px] xl:h-[300px] overflow-hidden bg-gray-200 animate-pulse shadow-lg">
        {/* Top Bar Skeleton */}
        <div className="absolute top-5 left-4 right-4 flex justify-between items-center">
          <div className="w-10 h-10 rounded-full bg-white/80" />
          <div className="flex gap-2">
            <div className="w-10 h-10 rounded-full bg-white/80" />
            <div className="w-10 h-10 rounded-full bg-white/80" />
          </div>
        </div>

        {/* Bottom Vendor Info Skeleton */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
          <div className="flex items-end gap-4">
            {/* Vendor Logo Skeleton */}
            <div className="w-16 h-16 rounded-xl bg-white shadow-md" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-1/2 bg-white/70 rounded" />
              <div className="h-4 w-3/4 bg-white/50 rounded" />
            </div>
          </div>

          {/* Stats Row Skeleton */}
          <div className="mt-4 flex justify-between bg-black/30 backdrop-blur-md rounded-xl px-4 py-2 text-white text-sm shadow-sm">
            <div className="flex-1 space-y-1 text-center">
              <div className="h-4 w-10 mx-auto bg-white/60 rounded" />
              <div className="h-3 w-12 mx-auto bg-white/40 rounded" />
            </div>
            <div className="flex-1 space-y-1 text-center border-x border-white/20">
              <div className="h-4 w-10 mx-auto bg-white/60 rounded" />
              <div className="h-3 w-12 mx-auto bg-white/40 rounded" />
            </div>
            <div className="flex-1 space-y-1 text-center">
              <div className="h-4 w-14 mx-auto bg-white/60 rounded" />
              <div className="h-3 w-16 mx-auto bg-white/40 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonFoodVendorHeader;
