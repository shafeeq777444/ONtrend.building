import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import { FreeMode, Mousewheel } from "swiper/modules";
import { FiShoppingBag } from "react-icons/fi";

const SkeltonTopRestuarent = () => {
  const dummyArray = Array.from({ length: 6 });

  return (
    <div className="px-4 py-6 w-full bg-white">
      <h2 className="text-xl font-bold mb-6 text-black">Top Restaurants</h2>

      <Swiper
        spaceBetween={8}
        slidesPerView={1.2}
        breakpoints={{
          480: { slidesPerView: 1.5 },
          640: { slidesPerView: 2.5 },
          768: { slidesPerView: 3.5 },
          1024: { slidesPerView: 4.5 },
          1280: { slidesPerView: 5.5 },
          1536: { slidesPerView: 6.5 },
        }}
        freeMode
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
          releaseOnEdges: true,
        }}
        modules={[FreeMode, Mousewheel]}
      >
        {dummyArray.map((_, index) => (
          <SwiperSlide key={index} className="overflow-visible">
            <div className="p-1">
              <div className="animate-pulse min-w-[220px] bg-white shadow-md rounded-md overflow-hidden relative">
                {/* Banner Image Placeholder */}
                <div className="relative w-full aspect-[4/4] bg-gray-200 flex items-center justify-center">
                  <FiShoppingBag className="text-gray-400 text-4xl" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Logo Placeholder */}
                <div className="absolute bottom-6 left-3 w-14 h-14 rounded-md bg-gray-300 shadow-md" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SkeltonTopRestuarent;
