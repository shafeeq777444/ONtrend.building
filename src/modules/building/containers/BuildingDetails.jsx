import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useBuildingDetail, useRoomsBasedOnBuildingId } from "@/shared/services/queries/building.query";

import BuildingCarouseImageCard from "@/modules/building/components/card/BuildingCarouseImageCard";
import BuildingDetailsCard from "../components/card/BuildingDetailsCard";
import BuildingRoomCard from "../components/card/BuildingRoomCard";
import BuildingRoomTypeCard from "../components/card/BuildingRoomTypeCard";

const BuildingDetails = () => {
  const { buildingId } = useParams();
  const [buildingRoomType, setBuildingRoomType] = useState("AllRooms");
  const { data: buildingDetail } = useBuildingDetail(buildingId);
  const { data } = useRoomsBasedOnBuildingId(buildingId);
  const rooms = data?.rooms || [];
  // Show all rooms if 'AllRooms' is selected, otherwise filter by room_type_id
  const filteredRooms =
    buildingRoomType === "AllRooms"
      ? rooms
      : rooms.filter((room) => room.room_type.id === buildingRoomType);
  const roomTypes = data?.roomTypes || [];
  console.log(buildingRoomType, "--bldroomtype");

  return (
    <div className="mt-2 px-4 sm:px-6">
      <div className=" flex flex-col lg:flex-row gap-6">
        {/* Right Content (Carousel + Room List + Description) */}
        <div className="w-full lg:w-[72%] flex flex-col gap-6 order-1 lg:order-2 h-auto lg:h-[90vh] overflow-y-auto pr-1 scrollbar-hide">
          {/* 1. Building Carousel - first in mobile */}
          <div className="order-1">
            <BuildingCarouseImageCard building={buildingDetail} />
          </div>

          {/* 3. Room Cards - third in mobile */}
          <div className="order-3 lg:order-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredRooms?.map((room, i) => (
                <BuildingRoomCard key={i} room={room} />
              ))}
              {[...Array(10)].map((_, i) => (
                <BuildingRoomCard key={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Left Sidebar (Building Details + Room Type Cards) */}
        <div className="w-full lg:w-[28%] flex flex-col items-center gap-6 order-2 lg:order-1">
          {/* Building Details */}
          <BuildingDetailsCard building={buildingDetail} />

          {/* 2. Room Type Cards - second in mobile */}
          <div className="w-full h-[300px] sm:h-[400px] lg:h-[60vh] overflow-y-auto pr-1 scrollbar-hide order-2 lg:order-2">
            <div className="flex flex-col items-center gap-4">
              <button
                className="bg-gray-600 px-26 py-2 rounded-md text-white transition-all duration-200 hover:bg-gray-800 focus:bg-gray-800 focus:scale-105 "
                onClick={() => setBuildingRoomType("AllRooms")}
              >
                Explore All Rooms
              </button>
              {roomTypes.map((roomType) => (
                <div key={roomType.id} onClick={() => setBuildingRoomType(roomType.id)}>
                <BuildingRoomTypeCard
                  buildingRoomType={buildingRoomType}
                  setBuildingRoomType={setBuildingRoomType}
                  roomType={roomType}
                  selected={buildingRoomType === roomType.id}
                />
              </div>
              
              ))}
              {[...Array(10)].map((_, i) => (
                 <div key={i} onClick={() => setBuildingRoomType(i)}>
                 <BuildingRoomTypeCard
                   buildingRoomType={buildingRoomType}
                   setBuildingRoomType={setBuildingRoomType}
                   roomType={i}
                   selected={buildingRoomType ===i}
                 />
               </div>
               
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingDetails;
