import React from "react";
import { FiImage } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const SkeletonHomeHighlites = () => {
  const skeletonSlides = Array(5).fill(0);

  return (
    <div className="px-4 py-6 bg-white">
       {/* heading */}
            <div className="h-6 w-40 ml-4 bg-gray-200 rounded mb-6 animate-pulse" />
      <Swiper
        spaceBetween={12}
        slidesPerView={1.2}
        centeredSlides={true} 
        loop={true}
        breakpoints={{
          480: { slidesPerView: 1.6 },
          640: { slidesPerView: 2.5 },
          768: { slidesPerView: 3.5 },
          1024: { slidesPerView: 4.5 },
          1280: { slidesPerView: 3.5 },
        }}
      >
        {skeletonSlides.map((_, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-[260px] bg-gray-200 animate-pulse rounded-md flex items-center justify-center shadow">
              <FiImage className="text-4xl text-gray-400" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SkeletonHomeHighlites;
