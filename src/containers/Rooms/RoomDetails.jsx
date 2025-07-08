import React from "react";
import RoomTitle from "@/components/Rooms/RoomDetail/RoomTitle";
import RoomHighliteImageGallery from "@/components/Rooms/RoomDetail/RoomHighliteImageGallery";
import RoomDetailSwitchingTab from "@/components/Rooms/RoomDetail/RoomDetailSwitchingTab";
import RoomGuestFavouriteBadge from "@/components/Rooms/RoomDetail/RoomGuestFavouriteBadge";
import { useParams } from "react-router-dom";
import { useBuildingDetail } from "@/hooks/queries/useBuildings";
import BuildingAmenities from "@/components/Rooms/RoomDetail/BuildingAmenties";
import BuildingDescription from "@/components/Rooms/RoomDetail/BuildingDescription";
import BuildingLocationMap from "@/components/Rooms/RoomDetail/BuildingLocationMap";
import BuildingOverallReview from "@/components/Rooms/RoomDetail/BuildingOverallReview";
import BuildingBookingSideBar from "@/components/Rooms/RoomDetail/BuildingBookingSideBar";
import BuildingRoomReviews from "@/components/Rooms/RoomDetail/BUildingRoomReviews";
import BuildingStayPolicies from "@/components/Rooms/RoomDetail/BuildingStayPolicies";
import { fallbackAdditional, fallbackCancellation } from "@/lib/constants";
import AvailableSlotCalender from "@/components/Rooms/Common/AvailableSlotCalender";

const RoomDetails = () => {
    const { buildingId } = useParams();
    console.log(buildingId);
    const { data } = useBuildingDetail(buildingId);
    console.log(data);
    return (
        <div className="px-8 py-4">
            {/* -------------------------- TOP TITLE IMAGES --------------------------------------------------------*/}
            <RoomHighliteImageGallery images={data?.building_media[0].images} />

            {/* -------------------------- Room MAIN DETAILS --------------------------------------------------------*/}
            <div className=" px-8 py-4  flex justify-between">
                {/* -------------------------- left side --------------------------*/}
                <div className="flex-1">
                    <RoomTitle name_ar={data?.name_ar} name_en={data?.name_en} />
                    <RoomGuestFavouriteBadge />
                    <RoomDetailSwitchingTab />
                    <BuildingDescription description_ar={data?.description_ar} description_en={data?.description_en} />
                    <AvailableSlotCalender/>
                    <BuildingAmenities amenities={data?.building_amenities} />
                    <BuildingStayPolicies
                        checkInTime={data?.check_in_time}
                        checkOutTime={data?.check_out_time}
                        cancellationPolicy={data?.cancellation_policy || fallbackCancellation}
                        additionalPolicy={data?.additionalpolicy || fallbackAdditional}
                    />

                    {/* review */}
                    {/* <BuildingOverallReview /> */}
                </div>
                {/*--------------------------  right side -------------------------- */}
                <BuildingBookingSideBar />
            </div>

            {/*  */}
            <BuildingRoomReviews />
            <BuildingLocationMap city={data?.city} state={data?.state} country={data?.country}  latitude={data?.latitude} longitude={data?.longitude} />
        </div>
    );
};

export default RoomDetails;
