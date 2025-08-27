import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import "swiper/css/autoplay";
import { Navigation, FreeMode, Mousewheel, Autoplay } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { useSelector } from "react-redux";

import { useTranslation } from "react-i18next";
import DiscountDealsCard from "@/modules/food/components/foodHome/DiscountDealsCard";
import SkeletonFoodDiscountDeals from "@/shared/components/skeleton/SkeletonFoodDiscountDeals";
import { useGetAllFoodVendors } from "@/modules/food/services/queries/useGetAllFoodVendors";
import EmptyStateCard from "@/shared/components/messages/EmptyStateCard";

const FoodDiscountDeals = () => {
    const { i18n } = useTranslation();
    const isArabic = i18n.language === "ar";

    const {
        location: { lat, lng },
    } = useSelector((state) => state.user);

    const { data: allfoodVendors, isLoading } = useGetAllFoodVendors(lat, lng);
    const discountedFoodVendors = allfoodVendors?.filter((vendor) => vendor.discountValue > 0);

    if (isLoading) {
        return <SkeletonFoodDiscountDeals />;
    }
    if (!isLoading && discountedFoodVendors?.length === 0) {
        return (
            <div className="px-4 py-6 relative bg-white">
                {/* Heading */}
                <h2 className={`text-xl font-bold mb-4 pl-4 ${isArabic ? "text-right" : "text-left"}`}>
                    {isArabic ? "عروض الخصم" : "Discount Deals"}
                </h2>

                <EmptyStateCard
                    heading={isArabic ? "لا توجد عروض خصم حالياً" : "No current discount deals"}
                    description={
                        isArabic
                            ? "جرّب استكشاف مطاعم أخرى أو تحقق لاحقاً من العروض الجديدة."
                            : "Try exploring other vendors or check back later for new deals."
                    }
                    lottieSrc="/lotties/errorOrWarnings/Shopping bag.json"
                    notify={true}
                    width="w-26"
                    height="h-26"
                />
            </div>
        );
    }

    return (
        <div className="px-4 py-6 relative bg-white">
            {/* Heading */}
            <h2 className={`text-xl font-bold mb-4 pl-4 ${isArabic ? "text-right" : "text-left"}`}>
                {isArabic ? "عروض الخصم" : "Discount Deals"}
            </h2>

            {/* Swiper Buttons */}
            <button
                className={`hidden md:block swiper-button-prev-food absolute top-0 ${
                    isArabic ? "left-8" : "right-14"
                } z-10 bg-white p-2 rounded-full shadow mt-4 hover:bg-gray-100 transition`}
            >
                <FiChevronLeft size={20} />
            </button>

            <button
                className={`hidden md:block swiper-button-next-food absolute top-0 ${
                    isArabic ? "left-20" : "right-4"
                } z-10 bg-white p-2 rounded-full shadow mt-4 hover:bg-gray-100 transition`}
            >
                <FiChevronRight size={20} />
            </button>

            {/* Swiper Carousel */}
            <Swiper
                dir={isArabic ? "rtl" : "ltr"}
                spaceBetween={1}
                slidesPerView={1.3}
                breakpoints={{
                    480: { slidesPerView: 1.5 },
                    640: { slidesPerView: 2.5 },
                    768: { slidesPerView: 3.5 },
                    1024: { slidesPerView: 4.5 },
                    1280: { slidesPerView: 5.5 },
                }}
                navigation={{
                    nextEl: ".swiper-button-next-food",
                    prevEl: ".swiper-button-prev-food",
                }}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                freeMode={true}
                mousewheel={{
                    forceToAxis: true,
                    sensitivity: 1,
                    releaseOnEdges: true,
                }}
                modules={[Navigation, FreeMode, Mousewheel, Autoplay]}
            >
                {discountedFoodVendors?.map((vendor, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="p-2">
                            <DiscountDealsCard vendor={vendor} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default FoodDiscountDeals;
