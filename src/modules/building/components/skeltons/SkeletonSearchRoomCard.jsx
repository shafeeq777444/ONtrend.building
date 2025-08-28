import React from "react";

const SkeletonSearchRoomCard = () => {
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden animate-pulse max-w-sm w-full mx-auto">
      {/* Image placeholder */}
      <div className="h-40 bg-gray-200 rounded-t-3xl"></div>

      {/* Room details */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div> {/* title */}
        <div className="h-3 bg-gray-200 rounded w-1/2"></div> {/* room number */}

        <div className="flex justify-between items-center">
          <div className="h-3 bg-gray-200 rounded w-1/4"></div> {/* room type */}
          <div className="h-3 bg-gray-200 rounded w-1/6"></div> {/* area */}
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="h-3 bg-gray-200 rounded w-1/5"></div>
          <div className="h-3 bg-gray-200 rounded w-1/5"></div>
          <div className="h-3 bg-gray-200 rounded w-1/5"></div>
        </div>

        <div className="h-3 bg-gray-200 rounded w-1/2"></div> {/* building info */}
        <div className="flex justify-between items-center mt-2">
          <div className="h-3 bg-gray-200 rounded w-1/4"></div> {/* availability */}
          <div className="h-8 bg-gray-300 rounded w-20"></div> {/* button */}
        </div>
      </div>
    </div>
  );
};

export default SkeletonSearchRoomCard;
