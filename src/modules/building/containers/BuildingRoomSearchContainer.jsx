import React, { useRef, useEffect } from "react";
import { useSearchRoomsInfinite } from "../services/hooks/useSearchRoomsInfinite";
import { useNavigate, useSearchParams } from "react-router-dom";

import BuildingRoomSearchBar from "./BuildingRoomSearchBar";
import BackButton from "../components/Common/BackButton";
import BuildingSearchedRoomCard from "../components/Card/BuildingSearchedRoomCard";

const BuildingRoomSearchContainer = () => {

    // --------------- hooks------------
    const [searchParams] = useSearchParams();
    const navigate=useNavigate()

    const adultCount = parseInt(searchParams.get("adults")) || 1;
    const childrenCount = parseInt(searchParams.get("children")) || 0;


    // --------- functions -------------
    const handleViewDetails = (room) => {
        navigate(`/building/${room.building_id?.id}/room/${room.id}`);
    };

    const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useSearchRoomsInfinite({
        adultCount,
        childrenCount,
    });

    // Ref for the load more trigger element
    const loadMoreRef = useRef(null);

    useEffect(() => {
        if (!hasNextPage) return; // No more pages to load

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    fetchNextPage();
                }
            },
            { threshold: 1.0 } // Trigger when fully visible
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(loadMoreRef.current);
            }
        };
    }, [hasNextPage, fetchNextPage]);

    if (isLoading) return <div className="p-4">Loading rooms...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>;

    return (
        <div className="p-4">
            <BackButton />  
            <BuildingRoomSearchBar />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 mt-4">
                {data?.pages.flat().map((room) => (
                    <BuildingSearchedRoomCard key={room.id} room={room} handleViewDetails={handleViewDetails} />
                ))}
            </div>

            {/* Auto-load trigger */}
            {hasNextPage && (
                <div ref={loadMoreRef} className="text-center mt-8 text-gray-500">
                    {isFetchingNextPage ? "Loading more..." : "Scroll to load more"}
                </div>
            )}
        </div>
    );
};

export default BuildingRoomSearchContainer;
