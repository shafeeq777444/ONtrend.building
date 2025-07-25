import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import "swiper/css/grid";

import { Navigation, FreeMode, Mousewheel, Grid } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { auth } from "@/lib/firebase/config";
import { useWishlist } from "@/shared/services/queries/wishlist.query";
import RestaurantCard from "../../components/cards/RestaurantCard";
import { useGetAllTopVendors } from "@/shared/services/queries/vendors.query";
import SkeltonRestuarent from "@/modules/food/components/skeltons/SkeltonRestuarent";

const TopPicks = () => {
    const currentUserId = auth.currentUser?.uid;
    const { data: wishlist = [] } = useWishlist(currentUserId);
    const { i18n } = useTranslation();
    const isArabic = i18n.language === "ar";
    const wishlistIds = useMemo(() => new Set(wishlist.map((item) => item.id)), [wishlist]);
    const {
        location: { lat, lng },
    } = useSelector((state) => state.user);
    const { data: vendors, isLoading } = useGetAllTopVendors(lat, lng);

    const topRestaurants = useMemo(() => {
        return vendors?.filter((vendor) => vendor.vendorType === "Food/Restaurant") || [];
    }, [vendors]);

    const shuffledTopRestaurants = useMemo(() => {
        return [...topRestaurants].sort(() => 0.5 - Math.random());
    }, [topRestaurants]);

    if (isLoading) {
        return <SkeltonRestuarent heading={false} />;
    }
console.log("render check")
    return (
        <div className="px-4 py-6 relative w-full">
            {/* Navigation Buttons */}
            <button
                className={`swiper-button-prev-restuarent absolute -top-12 hidden md:block ${
                    isArabic ? "left-10" : "right-16"
                } z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition`}
            >
                <FiChevronLeft size={22} />
            </button>
            <button
                className={`swiper-button-next-restuarent absolute -top-12 hidden md:block${
                    isArabic ? "left-22" : "right-4"
                } z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition`}
            >
                <FiChevronRight size={22} />
            </button>

            <Swiper
                spaceBetween={1}
                slidesPerView={4} // 4 cards per row
                grid={{
                    rows: 2, // 2 rows = 8 cards visible at once
                    fill: "row",
                }}
                breakpoints={{
                    320: { slidesPerView: 1.5 }, // For small screens
                    480: { slidesPerView: 2 },
                    640: { slidesPerView: 3 },
                    768: { slidesPerView: 4 }, // 4 x 2 = 8 cards visible
                    1024: { slidesPerView: 4 },
                    1280: { slidesPerView: 4 },
                }}
                navigation={{
                    nextEl: ".swiper-button-next-restuarent",
                    prevEl: ".swiper-button-prev-restuarent",
                }}
                freeMode
                mousewheel={{
                    forceToAxis: true,
                    sensitivity: 1,
                    releaseOnEdges: true,
                }}
                modules={[Navigation, FreeMode, Mousewheel, Grid]}
            >
                {shuffledTopRestaurants.map((restaurant) => (
                    <SwiperSlide key={restaurant.id} className="overflow-visible">
                        <RestaurantCard isLiked={wishlistIds.has(restaurant.id)} restaurant={restaurant} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TopPicks;
