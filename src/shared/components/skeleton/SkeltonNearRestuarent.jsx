import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import "swiper/css/grid";

const SkeltonRestuarent = () => {
  return (
    <div className="px-4 py-6 relative w-full">
      {/* Swiper Skeleton */}
      <Swiper
        spaceBetween={1}
        slidesPerView={4}
        grid={{
          rows: 2,
          fill: "row",
        }}
        breakpoints={{
          320: { slidesPerView: 1.5 },
          480: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 4 },
        }}
        freeMode
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
          releaseOnEdges: true,
        }}
        modules={[FreeMode, Mousewheel, Grid]}
      >
        {[...Array(8)].map((_, index) => (
          <SwiperSlide key={index} className="overflow-visible px-1 pb-3">
            <div className="animate-pulse relative rounded-lg overflow-hidden shadow-md min-w-[220px] bg-white">
              {/* Banner Image */}
              <div className="relative w-full aspect-[4/3] bg-gray-200" />

              {/* Bottom Info Section */}
              <div className="absolute bottom-4 left-3 flex items-start space-x-3 z-10">
                {/* Logo Skeleton */}
                <div className="rounded-lg w-14 h-14 bg-white shadow-md overflow-hidden">
                  <div className="w-full h-full bg-gray-300" />
                </div>

                {/* Text Info Skeleton */}
                <div className="text-white space-y-1 mt-0.5">
                  <div className="bg-gray-300 h-4 w-32 rounded" />
                  <div className="bg-gray-300 h-3 w-24 rounded" />
                  <div className="flex space-x-2">
                    <div className="bg-gray-300 h-3 w-12 rounded" />
                    <div className="bg-gray-300 h-3 w-14 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SkeltonRestuarent;
