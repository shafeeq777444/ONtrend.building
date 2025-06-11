import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FiShoppingBag } from "react-icons/fi";

const SkeletonTopPharmacies = () => {
  const dummyArray = Array.from({ length: 6 });

  return (
    <div className="px-4 py-6 bg-white">
      <h2 className="text-xl font-bold mb-4">Top Pharmacies</h2>

      <Swiper
        spaceBetween={16}
        slidesPerView={1.6}
        breakpoints={{
          480: { slidesPerView: 1.5 },
          640: { slidesPerView: 2.5 },
          768: { slidesPerView: 3.5 },
          1024: { slidesPerView: 4.5 },
          1280: { slidesPerView: 5.5 },
          1536: { slidesPerView: 6.5 },
        }}
      >
        {dummyArray.map((_, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-44 rounded-2xl overflow-hidden shadow-lg animate-pulse relative bg-gray-100">
              <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-200">
                <FiShoppingBag className="text-gray-400 text-4xl" />
              </div>
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 via-black/30 to-transparent px-4 py-3">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SkeletonTopPharmacies;
