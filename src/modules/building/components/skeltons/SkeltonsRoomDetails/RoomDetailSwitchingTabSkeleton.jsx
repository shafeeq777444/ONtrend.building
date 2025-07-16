import React from "react";

const RoomDetailSwitchingTabSkeleton = () => {
  return (
    <div className="mt-8 py-4 sticky top-14 bg-white z-30 animate-pulse">
      <div className="flex space-x-6 px-4 gap-6">
        {Array(7).fill(0).map((_, i) => (
          <div key={i} className="w-24 h-5 bg-gray-200 rounded-full" />
        ))}
      </div>
    </div>
  );
};

export default RoomDetailSwitchingTabSkeleton;
