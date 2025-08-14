import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useBuildingDetail, useRoomsBasedOnBuildingId } from "@/shared/services/queries/building.query";

import BuildingCarouseImageCard from "@/modules/building/components/card/BuildingCarouseImageCard";
import BuildingDetailsCard from "../components/card/BuildingDetailsCard";
import BuildingRoomCard from "../components/card/BuildingRoomCard";
import BuildingRoomTypeCard from "../components/card/BuildingRoomTypeCard";
import BuildingDetailsSkeleton from "../components/skeltons/SkeletonBuildingDetails";
import BuildingRoomTypeCardMobile from "../components/Card/BuildingRoomTypeCardMobile";

const BuildingDetails = () => {
    // -----------------states-----------------------------
     const [isMobile, setIsMobile] = useState(false);
     const [buildingRoomType, setBuildingRoomType] = useState("AllRooms");

    //  -----------------hooks----------------------------- 
    const navigate = useNavigate();
    const { buildingId } = useParams();
    const location = useLocation();

    const { data: buildingDetail, isLoading: isBuildingLoading } = useBuildingDetail(buildingId);
    const { data: roomsData, isLoading: isRoomsLoading } = useRoomsBasedOnBuildingId(buildingId);

    // -----------------functions----------------------------
    const rooms = roomsData?.rooms || [];
    // Show all rooms if 'AllRooms' is selected, otherwise filter by room_type_id
    const filteredRooms =
        buildingRoomType === "AllRooms" ? rooms : rooms.filter((room) => room.room_type.id === buildingRoomType);
    const roomTypes = roomsData?.roomTypes || [];
  const handleBack = () => {
    const currentPath = location.pathname; // e.g., /c/689d6337-200c-832c-9a7c-1b618ef1f974
    const segments = currentPath.split("/").filter(Boolean); // split into ["c", "689d6337-200c-832c-9a7c-1b618ef1f974"]

    // remove last segment
    segments.pop();

    const newPath = "/" + segments.join("/") + "/"; // reconstruct path with trailing slash
    navigate(newPath);
  };

    // -----------------useEffects----------------------------
useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // <1024px = mobile/tablet
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
    if (isBuildingLoading || isRoomsLoading) return <BuildingDetailsSkeleton />;
    return (
        <div className="mt-2 px-4 sm:px-6 mb-4">
            <div>
                <button 
                    onClick={handleBack}
                    className="flex items-center justify-center w-10 h-10  rounded-full bg-white shadow-md hover:bg-gray-100 text-gray-700 2xl:fixed  transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                    aria-label="Go back"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Right Content (Carousel + Room List + Description) */}
                <div className="w-full lg:w-[72%] flex flex-col gap-6 order-1 lg:order-2 h-auto lg:h-[93vh] overflow-y-auto pr-1 scrollbar-hide p-4">
                    {/* 1. Building Carousel - not in mobile */}
                    {!isMobile && <div className="order-1">
                        <BuildingCarouseImageCard building={buildingDetail} />
                    </div>}

                    {/* room type in mobile */}
                    {isMobile && ( <div className="w-full lg:w-[28%] flex flex-col items-center gap-6 order-2 lg:order-1 mt-2">

                    {/* Building Details  mobiel top*/}
                    <BuildingDetailsCard building={buildingDetail} />

                    {/* toomtype- categories in mobile */}
                    <div className="w-full overflow-y-auto pr-1 scrollbar-hide order-2 lg:order-2 p-4">
                        <div className="flex items-center gap-4 ">
                            <button
                                className="bg-gray-600 px-26 py-2 rounded-md text-white transition-all duration-200 hover:bg-gray-800 focus:bg-gray-800 focus:scale-105 "
                                onClick={() => setBuildingRoomType("AllRooms")}
                            >
                                Explore All Rooms
                            </button>
                            {roomTypes.map((roomType) => (
                                <div key={roomType.id} onClick={() => setBuildingRoomType(roomType.id)}>
                                    <BuildingRoomTypeCardMobile
                                        buildingRoomType={buildingRoomType}
                                        setBuildingRoomType={setBuildingRoomType}
                                        roomType={roomType}
                                        selected={buildingRoomType === roomType.id}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>)}

                    {/* 3. Room Cards - third in mobile */}
                    <div className="order-3 lg:order-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {filteredRooms?.map((room, i) => (
                                <BuildingRoomCard key={i} room={room} />
                            ))}

                            {/* mimic */}
                            {/* {[...Array(10)].map((_, i) => (
                                <BuildingRoomCard key={i} />
                            ))} */}
                        </div>
                    </div>
                </div>

                {/* Left Sidebar (Building Details + Room Type Cards) */}
                {!isMobile && <div className="w-full lg:w-[28%] flex flex-col items-center gap-6 order-2 lg:order-1 mt-2">
                    {/* Building Details */}
                    <BuildingDetailsCard building={buildingDetail} />

                    {/* 2. Room Type Cards - laptop,computer,tablet */}
                    <div className="w-full h-[300px] sm:h-[400px] lg:h-[44vh]  2xl:h-[50vh] overflow-y-auto pr-1 scrollbar-hide order-2 lg:order-2 p-4">
                        <div className="flex flex-col items-center gap-4 ">
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
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default BuildingDetails;
