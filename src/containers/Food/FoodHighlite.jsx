import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import { Autoplay, FreeMode } from "swiper/modules";

// Example data
const highlitesData = [
  "/images/highlite1.jpg",
  "/images/highlite2.jpg",
  "/images/highlite3.jpg",
  "/images/highlite4.jpg",
   "/images/highlite1.jpg",
  "/images/highlite2.jpg",
  "/images/highlite3.jpg",
  "/images/highlite4.jpg",
];

const FoodHighlites = () => {
  return (
    <div className="px-4 py-6 bg-white">
      <Swiper
        spaceBetween={12}
        slidesPerView={1.1}
        breakpoints={{
          480: { slidesPerView: 1.6 },
          640: { slidesPerView: 2.5 },
          768: { slidesPerView: 3.5 },
          1024: { slidesPerView: 4.5 },
          1280: { slidesPerView: 3.5 },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        centeredSlides={true} 
        freeMode={true}
        loop={true}
        modules={[Autoplay, FreeMode]}
      >
        {highlitesData.map((imgSrc, index) => (
          <SwiperSlide key={index}>
            <img
              src={imgSrc}
              alt={`highlight-${index}`}
              className="rounded-xl w-full h-[260px] object-cover shadow"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FoodHighlites;
