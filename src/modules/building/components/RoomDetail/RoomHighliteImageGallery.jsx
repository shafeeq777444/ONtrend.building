import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const fallbackImg =
  "https://plus.unsplash.com/premium_photo-1676823547752-1d24e8597047?fm=jpg&q=60&w=3000";

const RoomHighliteImageGallery = ({ images = [] }) => {
  const safeImage = (img) => (typeof img === "string" && img.trim() !== "" ? img : fallbackImg);

  const handleImageError = (e) => {
    if (e.target.src !== fallbackImg) {
      e.target.src = fallbackImg;
    }
  };

  return (
    <>
      {/* 👉 Mobile View: Swiper with autoplay and pagination */}
      <div className="block lg:hidden mt-10 relative pb-6">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          spaceBetween={10}
          slidesPerView={1}
          loop
          pagination={{ clickable: true }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={safeImage(img)}
                alt={`Image ${index}`}
                className="w-full h-60 object-cover rounded-xl"
                onError={handleImageError}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 👉 Desktop View: Grid layout */}
      <div className="hidden lg:grid mt-10 gap-3 grid-cols-4 grid-rows-2 h-[400px] rounded-md overflow-hidden">
        {/* Left Big Image */}
        <div className="col-span-2 row-span-2">
          <img
            src={safeImage(images[0])}
            alt="Main"
            className="w-full h-full object-cover rounded-xl"
            onError={handleImageError}
          />
        </div>

        {/* Top Right */}
        <div className="col-span-2 row-span-1">
          <img
            src={safeImage(images[1])}
            alt="Top Right"
            className="w-full h-full object-cover rounded-xl"
            onError={handleImageError}
          />
        </div>

        {/* Bottom Right - Two Images */}
        <div className="col-span-2 row-span-1 grid grid-cols-2 gap-2">
          {images.slice(2, 4).map((img, index) => (
            <div key={index} className="relative group">
              <img
                src={safeImage(img)}
                alt={`Bottom Right ${index}`}
                className="w-full h-full object-cover rounded-xl"
                onError={handleImageError}
              />
              {index === 1 && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-xl hover:bg-black/40 transition-all cursor-pointer">
                  <span className="text-white text-sm font-medium px-4 py-2 bg-white/10 rounded-full backdrop-blur-md">
                    Explore the Space
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RoomHighliteImageGallery;
