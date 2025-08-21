import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import { Navigation, FreeMode, Mousewheel } from "swiper/modules";

const SkeletonTopGroceries = () => {
  return (
    <div className="px-4 relative">
      {/* Heading */}
      <div className="h-6 w-40 ml-4 bg-gray-200 rounded mb-6 animate-pulse" />

      {/* Navigation Buttons */}
      <button className="swiper-button-prev-grocery absolute hidden md:block top-0 right-14 z-10 bg-white p-2 rounded-full shadow mt-4">
        <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse" />
      </button>
      <button className="swiper-button-next-grocery absolute hidden md:block top-0 right-4 z-10 bg-white p-2 rounded-full shadow mt-4">
        <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse" />
      </button>

      <Swiper
        spaceBetween={1}
        slidesPerView={1.6}
        breakpoints={{
          480: { slidesPerView: 1.5 },
          640: { slidesPerView: 2.5 },
          768: { slidesPerView: 3.5 },
          1024: { slidesPerView: 4.5 },
          1280: { slidesPerView: 5.5 },
          1536: { slidesPerView: 6.5 },
        }}
        navigation={{
          nextEl: ".swiper-button-next-grocery",
          prevEl: ".swiper-button-prev-grocery",
        }}
        freeMode={true}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
          releaseOnEdges: true,
        }}
        modules={[Navigation, FreeMode, Mousewheel]}
      >
        {[...Array(6)].map((_, index) => (
          <SwiperSlide key={index}>
            <div className="p-2">
              <div className="group relative rounded-lg shadow-md flex flex-col items-center text-center animate-pulse">
                {/* Image Block */}
                <div className="w-full h-44 rounded-lg overflow-hidden mb-3 relative bg-gray-200" />

                {/* Vendor Name */}
                <div className="h-4 w-2/3 bg-gray-200 rounded mb-2"></div>

                {/* Button */}
                <div className="h-6 w-24 bg-gray-200 rounded mb-1"></div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SkeletonTopGroceries;
