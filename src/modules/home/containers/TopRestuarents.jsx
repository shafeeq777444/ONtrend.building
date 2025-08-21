import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import { Navigation, FreeMode, Mousewheel } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { auth } from "@/lib/firebase/config";
import { useSelector } from "react-redux";
import { useGetAllTopVendors } from "@/modules/food/services/queries/useGetAllTopVendors";
import { useWishlist } from "@/modules/wishlist/services/queries/wishlist.query";

import SkeltonRestuarent from "@/modules/food/components/skeltons/SkeltonRestuarent";
import RestaurantCard from "@/modules/food/components/cards/RestaurantCard";
import EmptyVendorsMessage from "@/shared/components/messages/EmptyVendorsMessage";
import ErrorMessage from "@/shared/components/messages/ErrorMessage";

const TopRestaurants = ({setBannerON}) => { 
    const currentUserId = auth.currentUser?.uid;
    const { i18n } = useTranslation();
    const isArabic = i18n.language === "ar";

    const { data: wishlist = [] } = useWishlist(currentUserId);
    const wishlistIds = useMemo(() => new Set(wishlist.map((item) => item.id)), [wishlist]);

    const {
        location: { lat, lng },
    } = useSelector((state) => state.user);

    const { data, isLoading } = useGetAllTopVendors(lat, lng);
    const vendors = useMemo(() => data?.vendors || [], [data?.vendors]);
    const message = useMemo(() => data?.message || null, [data?.message]);

    const topRestaurants = vendors?.filter((vendor) => vendor.vendorType === "Food/Restaurant") || [];
  

    if (isLoading || (topRestaurants.length === 0 && message === null)) {
        return <SkeltonRestuarent rows={1} />;
    }
     if (topRestaurants.length === 0 && message) {
        // console.log(message, "message on top vendors");
        setBannerON(false)
        return <EmptyVendorsMessage />;
    }
    return (
        <div className="px-4 py-6 relative w-full">
            <h2 className="text-xl font-bold mb-6 pl-4 text-black">{isArabic ? "أفضل المطاعم" : "Top Restaurants"}</h2>

            {/* Custom Navigation Buttons (Swapped class names when Arabic) */}
            <button
                className={`${
                    isArabic ? "swiper-button-next-restuarent left-10" : "swiper-button-prev-restuarent right-14"
                } absolute top-1 z-20 bg-white p-2 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-50 active:bg-gray-100 active:scale-95 hidden md:flex items-center justify-center transition-all duration-200 ease-in-out border border-gray-100 hover:border-gray-200 cursor-pointer select-none min-w-[36px] min-h-[36px]`}
            >
                <FiChevronLeft size={16} className="text-gray-700 hover:text-gray-900 transition-colors" />
            </button>

            <button
                className={`${
                    isArabic ? "swiper-button-prev-restuarent left-20" : "swiper-button-next-restuarent right-4"
                } absolute top-1 z-20 bg-white p-2 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-50 active:bg-gray-100 active:scale-95 hidden md:flex items-center justify-center transition-all duration-200 ease-in-out border border-gray-100 hover:border-gray-200 cursor-pointer select-none min-w-[36px] min-h-[36px]`}
            >
                <FiChevronRight size={16} className="text-gray-700 hover:text-gray-900 transition-colors" />
            </button>

            <Swiper
                spaceBetween={1}
                slidesPerView={1.2}
                breakpoints={{
                    480: { slidesPerView: 1.5 },
                    640: { slidesPerView: 2.5 },
                    768: { slidesPerView: 3.5 },
                    1024: { slidesPerView: 4.5 },
                    1280: { slidesPerView: 4.6 },
                    1536: { slidesPerView: 4.5 },
                }}
                navigation={{
                    nextEl: isArabic ? ".swiper-button-prev-restuarent" : ".swiper-button-next-restuarent",
                    prevEl: isArabic ? ".swiper-button-next-restuarent" : ".swiper-button-prev-restuarent",
                }}
                freeMode
                mousewheel={{
                    forceToAxis: true,
                    sensitivity: 1,
                    releaseOnEdges: true,
                }}
                modules={[Navigation, FreeMode, Mousewheel]}
                dir={isArabic ? "rtl" : "ltr"} // optional RTL support
            >
                {topRestaurants.map((restaurant) => (
                    <SwiperSlide key={restaurant.id} className="overflow-visible">
                        <RestaurantCard
                            restaurant={restaurant}
                            topRestuarents={true}
                            isLiked={wishlistIds.has(restaurant.id)}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TopRestaurants;
