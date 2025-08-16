import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBuildingDetail, useRoomsBasedOnBuildingId } from "@/shared/services/queries/building.query";

import BuildingCarouseImageCard from "@/modules/building/components/card/BuildingCarouseImageCard";
import BuildingDetailsCard from "../components/card/BuildingDetailsCard";
import BuildingRoomCard from "../components/card/BuildingRoomCard";
import BuildingRoomTypeCard from "../components/card/BuildingRoomTypeCard";
import BuildingDetailsSkeleton from "../components/skeltons/SkeletonBuildingDetails";
import BuildingRoomTypeCardMobile from "../components/Card/BuildingRoomTypeCardMobile";
import BackButton from "../components/Common/BackButton";

const BuildingDetails = () => {
    // -----------------states-----------------------------
    const [isMobile, setIsMobile] = useState(false);
    const [buildingRoomType, setBuildingRoomType] = useState("AllRooms");

    //  -----------------hooks-----------------------------
    const { buildingId } = useParams();
    const { data: buildingDetail, isLoading: isBuildingLoading } = useBuildingDetail(buildingId);
    const { data: roomsData, isLoading: isRoomsLoading } = useRoomsBasedOnBuildingId(buildingId);

    // -----------------functions----------------------------
    const rooms = roomsData?.rooms || [];
    // Show all rooms if 'AllRooms' is selected, otherwise filter by room_type_id
    const filteredRooms =
        buildingRoomType === "AllRooms" ? rooms : rooms.filter((room) => room.room_type.id === buildingRoomType);
    const roomTypes = roomsData?.roomTypes || [];

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
                <BackButton />
            </div>
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Right Content (Carousel + Room List + Description) */}
                <div className="w-full lg:w-[72%] flex flex-col gap-6 order-1 lg:order-2 h-auto lg:h-[93vh] overflow-y-auto pr-1 scrollbar-hide p-4">
                    {/* 1. Building Carousel - not in mobile */}
                    {!isMobile && (
                        <div className="order-1">
                            <BuildingCarouseImageCard building={buildingDetail} />
                        </div>
                    )}

                    {/* room type in mobile */}
                    {isMobile && (
                        <div className="w-full lg:w-[28%] flex flex-col items-center gap-6 order-2 lg:order-1 mt-2">
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
                        </div>
                    )}

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
                {!isMobile && (
                    <div className="w-full lg:w-[28%] flex flex-col items-center gap-6 order-2 lg:order-1 mt-2">
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default BuildingDetails;
