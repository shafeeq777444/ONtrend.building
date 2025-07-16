// components/skeletons/BuildingCardSkeleton.jsx
import React from "react";
// BuildingCardSkeleton
const BuildingCardSkeleton = () => {
    return (
      <div className="bg-white rounded-2xl shadow-md overflow-hidden min-w-[200px] animate-pulse">
        <div className="relative">
          <div className="w-full h-56 bg-gray-200 rounded-t-2xl" />
  
          {/* Heart */}
          <div className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md w-8 h-8" />
  
          {/* Rating */}
          <div className="absolute bottom-[-15px] right-3 bg-white rounded-full px-4 py-1 shadow-md h-6" />
        </div>
  
        <div className="p-4 pt-6 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-300 rounded-full" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
          <div className="flex justify-between items-center pt-2">
            <div />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
          </div>
        </div>
      </div>
    );
  };


// components/skeltons/SkeltonHomeBuildingCards.jsx

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel, Navigation, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import "swiper/css/grid";
import "swiper/css/navigation";


const SkeltonHomeBuildingCards = () => {
  return (
    <>
      {/* Optional: Keep same Swiper title/navigation */}
      <div className="mb-4">
        <div className="text-xl font-bold mb-2">Popular Stays in Oman</div>
      </div>

      <Swiper
        spaceBetween={4}
        slidesPerView={3.4}
        breakpoints={{
          320: { slidesPerView: 1.3 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 3.4 },
          1280: { slidesPerView: 4.8 },
        }}
        freeMode
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
          releaseOnEdges: true,
        }}
        modules={[Navigation, FreeMode, Mousewheel, Grid]}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <SwiperSlide key={index} className="overflow-visible py-2 px-1.5">
            <BuildingCardSkeleton />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SkeltonHomeBuildingCards;


