import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useBuildingDetail, useRoomDetail } from "@/shared/services/queries/building.query";
import { fallbackAdditional, fallbackCancellation } from "@/shared/utils/constants";
import AvailableSlotCalender from "../components/Common/AvailableSlotCalender";
import BuildingStayPolicies from "../components/RoomDetail/BuildingStayPolicies";
import BuildingRoomReviews from "../components/RoomDetail/BuildingRoomReviews";
import BuildingBookingSideBar from "../components/RoomDetail/BuildingBookingSideBar";
import BuildingAmenities from "../components/RoomDetail/BuildingAmenties";
import RoomGuestFavouriteBadge from "../components/RoomDetail/RoomGuestFavouriteBadge";
import RoomDetailSwitchingTab from "../components/RoomDetail/RoomDetailSwitchingTab";
import RoomHighliteImageGallery from "../components/RoomDetail/RoomHighliteImageGallery";
import RoomTitle from "../components/RoomDetail/RoomTitle";
import BuildingDescription from "../components/RoomDetail/BuildingDescription";
import BuildingLocationMap from "../components/RoomDetail/BuildingLocationMap";
import BuildingOverallReview from "../components/RoomDetail/BuildingOverallReview";
;


const RoomDetails = () => {
    const [activeTab, setActiveTab] = useState("Overview");
    const { roomId } = useParams();
    console.log(roomId,'roomId');
    const { data: roomData } = useRoomDetail(roomId);
    const { data: buildingData } = useBuildingDetail(roomData?.building_id);
    console.log(roomData,"room da");
    console.log(buildingData,"building da");
    // 🔗 Create refs for each section
  const overviewRef = useRef(null);
  const detailsRef = useRef(null);
  const availabilityRef = useRef(null);
  const amenitiesRef = useRef(null);
  const rulesRef = useRef(null);
  const reviewsRef = useRef(null);
  const locationRef = useRef(null);
    const handleTabClick = (tab) => {
        const refMap = {
          "Overview": overviewRef,
          "Rooms & Details": detailsRef,
          "Availability": availabilityRef,
          "Amenities": amenitiesRef,
          "House Rules": rulesRef,
          "Reviews": reviewsRef,
          "Location": locationRef,
        };
        const ref = refMap[tab];
        if (ref?.current) {
          ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };

    // Fallback values for room data
    const fallbackData = {
        name_ar: "غرفة فاخرة",
        name_en: "Luxury Room",
        description_ar: "غرفة فاخرة مع إطلالات رائعة",
        description_en: "Luxury room with amazing views",
        room_number: "101",
        floor: 1,
        price_per_night: 50,
        bed_count: 2,
        bed_type: { type: "Queen Bed", type_ar: "سرير كوين" },
        room_type: { type: "Deluxe", type_ar: "ديلوكس" },
        max_adults: 2,
        max_children: 1,
        images: [
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80", // Modern hotel room
            "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80", // Cozy hotel bed
            "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80",  // Bright hotel suite
            "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80", // Elegant hotel lounge
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80", // Minimalist hotel room
            "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80"  // Spacious hotel suite
        ],
        building_amenities: [],
        check_in_time: "14:00",
        check_out_time: "12:00",
        city: "Muscat",
        state: "Muscat",
        country: "Oman",
        latitude: 23.5880,
        longitude: 58.3829
    };
console.log(roomData?.images,'roomData?.images')
    return (
        <div className="px-4 sm:px-6 lg:px-8 py-4 max-w-7xl mx-auto">
            {/* -------------------------- TOP TITLE IMAGES --------------------------------------------------------*/}
            <div className="mb-6">
                <RoomHighliteImageGallery 
                    images={
                        Array.isArray(roomData?.images) && roomData.images.length > 0
                            ? roomData.images
                            : fallbackData.images
                    } 
                />
            </div>

            {/* -------------------------- Room MAIN DETAILS --------------------------------------------------------*/}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                {/* -------------------------- left side --------------------------*/}
                <div className="flex-1 order-2 lg:order-1">
                    <div className="space-y-6">
                        {/* Overview Section */}
                        <div ref={overviewRef} />
                        <RoomTitle 
                            name_ar={roomData?.name || fallbackData.name_ar} 
                            name_en={roomData?.name || fallbackData.name_en} 
                            bedCount={roomData?.bed_count || fallbackData.bed_count}
                            bedType={roomData?.bed_type?.type || fallbackData.bed_type.type}    
                            max_adults={roomData?.max_adults || fallbackData.max_adults}
                            max_children={roomData?.max_children || fallbackData.max_children}
                        />
                        <RoomGuestFavouriteBadge />
                        <RoomDetailSwitchingTab activeTab={activeTab} setActiveTab={setActiveTab} onTabClick={handleTabClick}/>
                        {/* Rooms & Details Section */}
                        <div ref={detailsRef} />
                        <BuildingDescription 
                            description_ar={roomData?.description || fallbackData.description_ar} 
                            description_en={roomData?.description || fallbackData.description_en} 
                        />
                        {/* Availability Section */}
                        <div ref={availabilityRef} />
                        <AvailableSlotCalender/>
                        {/* Amenities Section */}
                        <div ref={amenitiesRef} />
                        <BuildingAmenities amenities={roomData?.amenities || fallbackData.building_amenities} />
                        {/* House Rules Section */}
                        <div ref={rulesRef} />
                        <BuildingStayPolicies
                            checkInTime={buildingData?.check_in_time || fallbackData.check_in_time}
                            checkOutTime={buildingData?.check_out_time || fallbackData.check_out_time}
                            cancellationPolicy={ fallbackCancellation}
                            additionalPolicy={ fallbackAdditional}
                        />
                        {/* Reviews Section */}
                        <div ref={reviewsRef} />
                        <BuildingOverallReview />
                    </div>
                </div>
                
                {/*--------------------------  right side -------------------------- */}
                <div className="order-1 lg:order-2 lg:w-80 xl:w-96">
                    <div className="sticky top-6">
                        <BuildingBookingSideBar room={roomData} />
                    </div>
                </div>
            </div>

            {/* Bottom Sections */}
            <div className="mt-8 space-y-8">
                {/* Reviews Section (continued) */}
                <BuildingRoomReviews />
                {/* Location Section */}
                <div ref={locationRef}>
                <BuildingLocationMap 
                    city={roomData?.city || fallbackData.city} 
                    state={roomData?.state || fallbackData.state} 
                    country={roomData?.country || fallbackData.country}  
                    latitude={roomData?.latitude || fallbackData.latitude} 
                    longitude={roomData?.longitude || fallbackData.longitude} 
                />
                </div>
            </div>
        </div>
    );
};

export default RoomDetails;
