import React from "react";

const SkeletonFoodVendorHeader = () => {
  return (
    <div className="fixed top-14 right-0 w-full z-10">
      <div className="relative w-full h-[220px] md:h-[260px] overflow-hidden bg-gray-200 animate-pulse">
        {/* Top Controls */}
        <div className="absolute top-6 left-6 right-4 flex justify-between items-center">
          <div className="w-9 h-9 rounded-full bg-white/80" />
          <div className="flex gap-2">
            <div className="w-9 h-9 rounded-full bg-white/80" />
            <div className="w-9 h-9 rounded-full bg-white/80" />
          </div>
        </div>

        {/* Bottom Vendor Info */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
          <div className="flex items-end gap-4">
            {/* Logo */}
            <div className="w-16 h-16 rounded-xl bg-white shadow-md" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/2 bg-white/70 rounded" />
              <div className="h-3 w-3/4 bg-white/50 rounded" />
            </div>
          </div>

          {/* Stats Row */}
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
