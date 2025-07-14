import React from "react";
import { useParams } from "react-router-dom";
import { useBuildingDetail } from "@/shared/services/queries/building.query";

import BuildingCarouseImageCard from "@/modules/building/components/card/BuildingCarouseImageCard";
import BuildingDetailsCard from "../components/card/BuildingDetailsCard";
import BuildingRoomCard from "../components/card/BuildingRoomCard";
import BuildingRoomTypeCard from "../components/card/BuildingRoomTypeCard";

const BuildingDetails = () => {
  const { buildingId } = useParams();
  const { data: buildingDetail } = useBuildingDetail(buildingId);
  console.log(buildingDetail, "--building");

  return (
    <div className=" mt-24 md:mt-20 px-4 sm:px-6">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6">

        {/* Right Content (Carousel + Room List + Description) */}
        <div className="w-full lg:w-[72%] flex flex-col gap-6 order-1 lg:order-2 h-auto lg:h-[90vh] overflow-y-auto pr-1 scrollbar-hide">

          {/* 1. Building Carousel - first in mobile */}
          <div className="order-1">
            <BuildingCarouseImageCard building={buildingDetail} />
          </div>

          {/* 3. Room Cards - third in mobile */}
          <div className="order-3 lg:order-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {buildingDetail?.rooms?.map((room, i) => (
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
              {[...Array(10)].map((_, i) => (
                <BuildingRoomTypeCard key={i} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BuildingDetails;
