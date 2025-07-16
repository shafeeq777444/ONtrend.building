import React from "react";
import BuildingBookingSideBarSkeleton from "./BuildingBookingSideBarSkeleton";
import RoomTitleSkeleton from "./RoomTitleSkeleton";
import RoomGuestFavouriteBadgeSkeleton from "./RoomGuestFavouriteBadgeSkeleton";
import RoomDetailSwitchingTabSkeleton from "./RoomDetailSwitchingTabSkeleton";
import BuildingDescriptionSkeleton from "./BuildingDescriptionSkeleton";
import AvailableSlotCalendarSkeleton from "./AvailableSlotCalenderSkeleton";
import BuildingAmenitiesSkeleton from "./BuildingAmenitiesSkeleton";
import BuildingStayPoliciesSkeleton from "./BuildingStayPoliciesSkeleton";
import BuildingLocationMapSkeleton from "./BuildingLocationMapSkeleton";
import BuildingOverallReviewSkeleton from "../../RoomDetail/BuildingOverallReviewSkeleton";
import RoomHighliteImageGallerySkeleton from "./RoomHighliteImageGallerySkeleton";
import BuildingRoomReviewsSkeleton from "./BuildingRoomReviewsSkeleton.jsx";

const RoomDetailsSkeleton = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4">
      {/* 🖼️ Top Image Gallery Skeleton */}
      <div className="mb-6">
        <RoomHighliteImageGallerySkeleton />
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Left Side */}
        <div className="flex-1 order-2 lg:order-1 space-y-6">
          <RoomTitleSkeleton />
          <RoomGuestFavouriteBadgeSkeleton />
          <RoomDetailSwitchingTabSkeleton />
          <BuildingDescriptionSkeleton />
          <AvailableSlotCalendarSkeleton />
          <BuildingAmenitiesSkeleton />
          <BuildingStayPoliciesSkeleton />
          <BuildingLocationMapSkeleton />
          <BuildingOverallReviewSkeleton />
        </div>

        {/* Right Side Booking Sidebar */}
        <div className="order-1 lg:order-2 lg:w-80 xl:w-96">
          <div className="sticky top-16">
            <BuildingBookingSideBarSkeleton />
          </div>
        </div>
      </div>

      {/* Bottom Reviews */}
      <div className="mt-8 space-y-8">
        <BuildingRoomReviewsSkeleton />
      </div>
    </div>
  );
};

export default RoomDetailsSkeleton;
