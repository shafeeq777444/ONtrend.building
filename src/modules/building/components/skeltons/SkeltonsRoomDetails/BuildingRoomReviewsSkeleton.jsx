import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function BuildingRoomReviewsSkeleton() {
  return (
    <div className="flex h-screen overflow-hidden mt-18 animate-pulse">
      {/* Left Sticky Panel Skeleton */}
      <div className="w-1/3 p-6 bg-white sticky h-fit self-start">
        <div className="w-16 h-16 mb-4">
          <Skeleton circle={true} height={64} width={64} />
        </div>
        <Skeleton width={120} height={16} className="mb-6" />

        <div className="space-y-4">
          {Array(5)
            .fill()
            .map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton width={24} height={24} />
                <Skeleton width={120} height={12} />
              </div>
            ))}
        </div>
      </div>

      {/* Right Scrollable Panel Skeleton */}
      <div className="w-2/3 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        <Skeleton width={160} height={28} className="mb-4" />

        {Array(4)
          .fill()
          .map((_, i) => (
            <div key={i} className="border rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton width={80} height={14} />
                <Skeleton width={60} height={12} />
              </div>
              <Skeleton count={3} height={10} />
            </div>
          ))}

        <div className="flex justify-center pt-4">
          <Skeleton width={150} height={32} borderRadius={999} />
        </div>
      </div>
    </div>
  );
}