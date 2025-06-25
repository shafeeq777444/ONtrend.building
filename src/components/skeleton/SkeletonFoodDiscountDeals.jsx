import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useTranslation } from "react-i18next";

const CardSkeleton = () => {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-md min-w-[220px] bg-white animate-pulse">
      {/* Discount Badge Skeleton */}
      <div className="absolute top-2 right-2 w-16 h-4 bg-red-300 rounded-full z-20" />

      {/* Image Skeleton */}
      <div className="relative w-full aspect-[4/3] bg-gray-200" />

      {/* Bottom Info */}
      <div className="absolute bottom-4 left-3 flex items-start space-x-3 z-20">
        {/* Logo Skeleton */}
        <div className="rounded-lg w-14 h-14 bg-gray-300 shadow-md" />

        {/* Text Skeleton */}
        <div className="flex flex-col gap-1">
          <div className="w-32 h-3 bg-gray-300 rounded" />
          <div className="w-24 h-2 bg-gray-300 rounded" />
          <div className="w-28 h-2 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
};

const SkeletonFoodDiscountDeals = () => {
  const { i18n, t } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <div className="px-4 py-6 relative bg-white">
      <h2 className="text-xl font-bold mb-4">
        {isArabic ? "عروض الخصم" : "Discount Deals"}
      </h2>

      {/* Navigation buttons */}
      <button className="swiper-button-prev-food absolute top-0 right-14 z-10 bg-white p-2 rounded-full shadow mt-4 hover:bg-gray-100 transition">
        <FiChevronLeft size={20} />
      </button>
      <button className="swiper-button-next-food absolute top-0 right-4 z-10 bg-white p-2 rounded-full shadow mt-4 hover:bg-gray-100 transition">
        <FiChevronRight size={20} />
      </button>

      {/* Skeleton Swiper */}
      <Swiper
        spaceBetween={1}
        slidesPerView={1.3}
        breakpoints={{
          480: { slidesPerView: 1.5 },
          640: { slidesPerView: 2.5 },
          768: { slidesPerView: 3.5 },
          1024: { slidesPerView: 4.5 },
          1280: { slidesPerView: 5.5 },
        }}
      >
        {Array.from({ length: 6 }).map((_, idx) => (
          <SwiperSlide key={idx}>
            <div className="p-2">
              <CardSkeleton />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SkeletonFoodDiscountDeals;
