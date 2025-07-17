
import React, { useMemo } from "react";
// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import "swiper/css/grid";
import { Navigation, FreeMode, Mousewheel, Grid } from "swiper/modules";
import NavigationArrows from "@/shared/components/common/NavigationArrows";

import { auth } from "@/lib/firebase/config";
import { useWishlist } from "@/shared/services/queries/wishlist.query";
import { useBuildings } from "@/shared/services/queries/building.query";
import SkeltonHomeBuildingCards from "../components/skeltons/SkeltonHomeBuildingCards";
import BuildingHomeCard from "@/modules/building/components/card/BuildingHomeCard";

const AllBuildings = () => {
    const { data = [],isLoading } = useBuildings();
    console.log(data);
    // Clone the data 3 times
    const repeatedData = [...data, ...data, ...data];

    const currentUserId = auth.currentUser?.uid;
    const { data: wishlist = [] } = useWishlist(currentUserId);
    const wishlistIds = useMemo(() => new Set(wishlist.map((item) => item.id)), [wishlist]);

    if(isLoading){
        return (
            <div className="px-4 py-6 relative w-full">
                <SkeltonHomeBuildingCards />
            </div>
        )
    }

    return (
        <div className="px-4 py-6 relative w-full">
            {/* Swiper navigation buttons */}
            <NavigationArrows
                nextClass={"swiper-button-next-building"}
                preClass={"swiper-button-prev-building"}
                title={"Popular Stays in Oman"}
            />

            <Swiper
                spaceBetween={4} // or 12 for clean spacing between cards
                slidesPerView={3.4}
                breakpoints={{
                    320: { slidesPerView: 1.3 },
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 3.4 },
                    1280: { slidesPerView: 4.8 },
                }}
                navigation={{
                    nextEl: ".swiper-button-next-building",
                    prevEl: ".swiper-button-prev-building",
                }}
                freeMode
                mousewheel={{
                    forceToAxis: true,
                    sensitivity: 1,
                    releaseOnEdges: true,
                }}
                modules={[Navigation, FreeMode, Mousewheel, Grid]}
            >
                {repeatedData.map((building) => (
                    <SwiperSlide key={building.id} className="overflow-visible py-2 px-1.5">
                        <BuildingHomeCard
                            isLiked={wishlistIds.has(building.id)}
                            building={building}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default AllBuildings;
