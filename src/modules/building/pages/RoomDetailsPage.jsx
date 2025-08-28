import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {  useRoomDetail } from "@/shared/services/queries/building.query";
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
import RoomDetailsSkeleton from "../components/skeltons/SkeltonsRoomDetails/RoomDetailsSkelton";
import BackButton from "../components/Common/BackButton";
import ExploreSpaceImagesBuilding from "../containers/ExploreSpaceImagesBuilding";
import { useBuildingDetail } from "../services/hooks/useBuildingDetail";
const RoomDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState("Overview");
    const [exploreSpcae, setExploreSpace] = useState(false);
    const { roomId } = useParams();
    const { data: roomData, isLoading: isRoomLoading } = useRoomDetail(roomId);
    const { data: buildingData, isLoading: isBuildingLoading } = useBuildingDetail(roomData?.building_id);
    
    // 🔗 Create refs for each section
    const overviewRef = useRef(null);
    const detailsRef = useRef(null);
    const availabilityRef = useRef(null);
    const amenitiesRef = useRef(null);
    const rulesRef = useRef(null);
    const reviewsRef = useRef(null);
    const locationRef = useRef(null);

    // 🔍 Intersection Observer for automatic tab activation
    useEffect(() => {
        const refMap = {
            Overview: overviewRef,
            "Rooms & Details": detailsRef,
            Availability: availabilityRef,
            Amenities: amenitiesRef,
            "House Rules": rulesRef,
            Reviews: reviewsRef,
            Location: locationRef,
        };

        const observerOptions = {
            root: null,
            rootMargin: '-120px 0px -50% 0px', // Adjust based on header height and when to trigger
            threshold: 0.1
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Find which tab corresponds to this ref
                    const tabName = Object.keys(refMap).find(
                        tab => refMap[tab].current === entry.target
                    );
                    if (tabName) {
                        setActiveTab(tabName);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe all section refs
        Object.values(refMap).forEach(ref => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        // Cleanup observer on unmount
        return () => {
            Object.values(refMap).forEach(ref => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            });
            observer.disconnect();
        };
    }, [roomData, buildingData]); // Re-run when data loads

    // 🔝 Smooth scroll to top on component mount
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, []); // Run only once on mount

    const handleTabClick = (tab) => {
        const refMap = {
            Overview: overviewRef,
            "Rooms & Details": detailsRef,
            Availability: availabilityRef,
            Amenities: amenitiesRef,
            "House Rules": rulesRef,
            Reviews: reviewsRef,
            Location: locationRef,
        };
        const ref = refMap[tab];
        if (ref?.current) {
            const headerOffset = 120; // adjust based on your sticky tab/header height
            const elementPosition = ref.current.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset;

            // Update active tab state
            setActiveTab(tab);

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };
    const handleExplore = () => {
        setExploreSpace(true);
    };
    const handleBack = () => {
        const currentPath = location.pathname; // e.g., /c/689d6337-200c-832c-9a7c-1b618ef1f974
        const segments = currentPath.split("/").filter(Boolean); // split into ["c", "689d6337-200c-832c-9a7c-1b618ef1f974"]

        // remove last segment

        segments.pop();
        segments.pop();

        const newPath = "/" + segments.join("/") + "/"; // reconstruct path with trailing slash
        navigate(newPath);
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
            "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80", // Bright hotel suite
            "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80", // Elegant hotel lounge
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80", // Minimalist hotel room
            "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80", // Spacious hotel suite
        ],
        building_amenities: [],
        check_in_time: "14:00",
        check_out_time: "12:00",
        city: "Muscat",
        state: "Muscat",
        country: "Oman",
        latitude: 23.588,
        longitude: 58.3829,
    };
    if (isRoomLoading || isBuildingLoading || !roomData || !buildingData) {
        return <RoomDetailsSkeleton />;
    }
    return (
        <div className="px-4 sm:px-6 lg:px-8 py-4 ">
            <BackButton handleBack={handleBack} indicateText="Building" />
            {/* -------------------------- TOP TITLE IMAGES --------------------------------------------------------*/}
            <div className="md:mb-6 ">
                <div className="lg:hidden">
                    <RoomTitle
                                name_ar={roomData?.name || fallbackData.name_ar}
                                name_en={roomData?.name || fallbackData.name_en}
                                bedCount={roomData?.bed_count || fallbackData.bed_count}
                                bedType={roomData?.bed_type?.type || fallbackData.bed_type.type}
                                max_adults={roomData?.max_adults || fallbackData.max_adults}
                                max_children={roomData?.max_children || fallbackData.max_children}
                            />
                </div>
                <RoomHighliteImageGallery
                    handleExplore={handleExplore}
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
                        <div className="hidden lg:block">
                            <RoomTitle
                                name_ar={roomData?.name || fallbackData.name_ar}
                                name_en={roomData?.name || fallbackData.name_en}
                                bedCount={roomData?.bed_count || fallbackData.bed_count}
                                bedType={roomData?.bed_type?.type || fallbackData.bed_type.type}
                                max_adults={roomData?.max_adults || fallbackData.max_adults}
                                max_children={roomData?.max_children || fallbackData.max_children}
                            />
                        </div>
                        <RoomGuestFavouriteBadge />
                        <RoomDetailSwitchingTab
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            onTabClick={handleTabClick}
                        />
                        {/* Rooms & Details Section */}
                        <div ref={detailsRef} />
                        <BuildingDescription
                            description_ar={roomData?.description || fallbackData.description_ar}
                            description_en={roomData?.description || fallbackData.description_en}
                        />
                        {/* Availability Section */}
                        <div ref={availabilityRef} />
                        <AvailableSlotCalender />
                        {/* Amenities Section */}
                        <div ref={amenitiesRef} />
                        <BuildingAmenities amenities={roomData?.amenities || fallbackData.building_amenities} />
                        {/* House Rules Section */}
                        <div ref={rulesRef} />
                        <BuildingStayPolicies
                            checkInTime={buildingData?.check_in_time || fallbackData.check_in_time}
                            checkOutTime={buildingData?.check_out_time || fallbackData.check_out_time}
                            cancellationPolicy={fallbackCancellation}
                            additionalPolicy={fallbackAdditional}
                        />
                        {/* Reviews Section */}
                        <div ref={locationRef}>
                            <BuildingLocationMap
                                city={roomData?.city || fallbackData.city}
                                state={roomData?.state || fallbackData.state}
                                country={roomData?.country || fallbackData.country}
                                latitude={roomData?.latitude || fallbackData.latitude}
                                longitude={roomData?.longitude || fallbackData.longitude}
                            />
                        </div>
                        <div ref={reviewsRef} />
                        {/* <BuildingOverallReview /> */}
                    </div>
                </div>

                {/*--------------------------  right side -------------------------- */}
                <div className="order-1 lg:order-2 lg:w-80 xl:w-96 md:mt-24">
                    <div className="sticky top-40">
                        <BuildingBookingSideBar room={roomData} setActiveTab={setActiveTab} onTabClick={handleTabClick}/>
                    </div>
                </div>
            </div>

            {/* Bottom Sections */}
            <div className="mt-8 space-y-8">
                {/* Reviews Section (continued) */}
                <BuildingRoomReviews />
                {/* Location Section */}
            </div>
            {exploreSpcae && (
                <ExploreSpaceImagesBuilding
                    isOpen={exploreSpcae}
                    images={
                        Array.isArray(roomData?.images) && roomData.images.length > 0
                            ? roomData.images
                            : fallbackData.images
                    }
                    onClose={() => setExploreSpace(false)}
                />
            )}
        </div>
    );
};

export default RoomDetails;
