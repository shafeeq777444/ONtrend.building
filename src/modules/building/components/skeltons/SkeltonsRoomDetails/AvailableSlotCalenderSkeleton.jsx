import React from "react";

const SkeletonBox = ({ className }) => (
  <div className={`bg-gray-200 animate-pulse ${className}`} />
);

const CalendarGridSkeleton = () => (
  <div className="flex-1 px-2 py-4">
    {/* Weekdays */}
    <div className="grid grid-cols-7 mb-1 text-xs text-gray-400 text-center">
      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
        <div key={day}>{day}</div>
      ))}
    </div>
    {/* Days */}
    <div className="grid grid-cols-7 gap-1">
      {[...Array(42)].map((_, i) => (
        <SkeletonBox key={i} className="h-10 w-full rounded-md" />
      ))}
    </div>
  </div>
);

const AvailableSlotCalenderSkeleton = () => {
  return (
    <div className="max-w-2xl mx-auto mt-8 px-2">
      <div className="flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-h-[90vh] overflow-auto md:overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <SkeletonBox className="h-6 w-2/3 rounded" />
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <SkeletonBox className="w-8 h-8 rounded-full" />
            <div className="flex gap-8">
              <SkeletonBox className="h-4 w-24 rounded" />
              <SkeletonBox className="h-4 w-24 rounded" />
            </div>
            <SkeletonBox className="w-8 h-8 rounded-full" />
          </div>

          {/* Calendars */}
          <div className="flex flex-col md:flex-row">
            <CalendarGridSkeleton />
            <div className="hidden md:block w-px bg-gray-200" />
            <div className="hidden md:block flex-1 px-2 py-4">
              <CalendarGridSkeleton />
            </div>
          </div>

          {/* Footer Legend */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 gap-4 border-t border-gray-200 text-sm text-gray-600">
            <div className="flex flex-wrap gap-4">
              <SkeletonBox className="h-4 w-24 rounded" />
              <SkeletonBox className="h-4 w-20 rounded" />
              <SkeletonBox className="h-4 w-28 rounded" />
            </div>
            <SkeletonBox className="h-4 w-24 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableSlotCalenderSkeleton;
