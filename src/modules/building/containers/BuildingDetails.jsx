import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useBuildingDetail,
  useRoomsBasedOnBuildingId,
} from "@/shared/services/queries/building.query";

import BuildingCarouseImageCard from "@/modules/building/components/card/BuildingCarouseImageCard";
import BuildingDetailsCard from "../components/card/BuildingDetailsCard";
import BuildingRoomCard from "../components/card/BuildingRoomCard";
import BuildingRoomTypeCard from "../components/card/BuildingRoomTypeCard";
import BuildingDetailsSkeleton from "../components/skeltons/SkeletonBuildingDetails";

const BuildingDetails = () => {
  const { buildingId } = useParams();
  const [buildingRoomType, setBuildingRoomType] = useState("AllRooms");

  const { data: buildingDetail, isLoading: isBuildingLoading } =
    useBuildingDetail(buildingId);
  const { data: roomsData, isLoading: isRoomsLoading } =
    useRoomsBasedOnBuildingId(buildingId);

  const rooms = roomsData?.rooms || [];
  const roomTypes = roomsData?.roomTypes || [];

  const filteredRooms =
    buildingRoomType === "AllRooms"
      ? rooms
      : rooms.filter((room) => room.room_type.id === buildingRoomType);

  if (isBuildingLoading || isRoomsLoading) return <BuildingDetailsSkeleton />;

  return (
    <div className="mt-2 px-4 sm:px-6 mb-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Right Content (Carousel + Room List + Description) */}
        <div className="w-full lg:w-[72%] flex flex-col gap-6 order-1 lg:order-2 h-auto lg:h-[93vh] overflow-y-auto pr-1 scrollbar-hide p-4">
          {/* 1. Building Carousel */}
          <div className="order-1">
            <BuildingCarouseImageCard building={buildingDetail} />
          </div>

          {/* 2. Room Cards */}
          <div className="order-3 lg:order-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredRooms.map((room, i) => (
                <BuildingRoomCard key={i} room={room} />
              ))}
              {[...Array(10)].map((_, i) => (
                <BuildingRoomCard key={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Left Sidebar (Building Details + Room Types) */}
        <div
          className="w-full lg:w-[28%] flex flex-col items-center gap-6 order-1 lg:order-1 mt-2 
            max-h-[93vh] overflow-y-auto pr-1 scrollbar-hide p-4"
        >
          {/* Building Details */}
          <BuildingDetailsCard building={buildingDetail} />

          {/* Room Types Scrollable Section */}
          <div
            className="flex flex-row lg:flex-col gap-4 items-center lg:items-stretch overflow-x-auto lg:overflow-x-visible scrollbar-hide"
          >
            <button
              className="shrink-0 lg:shrink bg-gray-600 px-6 py-2 rounded-md text-white transition-all duration-200 hover:bg-gray-800 focus:bg-gray-800 focus:scale-105"
              onClick={() => setBuildingRoomType("AllRooms")}
            >
              Explore All Rooms
            </button>

            {roomTypes.map((roomType) => (
              <div
                key={roomType.id}
                className="shrink-0 lg:shrink"
                onClick={() => setBuildingRoomType(roomType.id)}
              >
                <BuildingRoomTypeCard
                  buildingRoomType={buildingRoomType}
                  setBuildingRoomType={setBuildingRoomType}
                  roomType={roomType}
                  selected={buildingRoomType === roomType.id}
                />
              </div>
            ))}

            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="shrink-0 lg:shrink"
                onClick={() => setBuildingRoomType(i)}
              >
                <BuildingRoomTypeCard
                  buildingRoomType={buildingRoomType}
                  setBuildingRoomType={setBuildingRoomType}
                  roomType={i}
                  selected={buildingRoomType === i}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingDetails;
