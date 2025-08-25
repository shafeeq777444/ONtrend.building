import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import { IoIosArrowBack } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import { useTranslation } from "react-i18next";
import SkeletonFoodVendorHeader from "@/shared/components/skeleton/SkeletonFoodVendorHeader";
import LazyImg from "@/shared/components/performanceOptimised/LazyImg";

const FoodVendorHeader = ({ vendorBanners = [], currentVendor = {}, isLoading, }) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const rating =
    currentVendor?.Ratings && currentVendor?.totalRatings
      ? (currentVendor.Ratings / currentVendor.totalRatings).toFixed(1)
      : "0.0";

  if (isLoading) return <SkeletonFoodVendorHeader />;

  return (
    <div className="relative  w-full scrollbar-hide">
      <div className="relative w-full h-[300px] sm:h-[450px] md:h-[400px] lg:h-[450px] xl:h-[300px] overflow-hidden shadow-lg">
        {/* Background Slider */}
        {vendorBanners.length > 0 ? (
          <Swiper
            modules={[Autoplay]}
            autoplay={{ 
              delay: 4000, 
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
              reverseDirection: false
            }}
            loop={true}
            loopAdditionalSlides={2}
            spaceBetween={0}
            slidesPerView={1} // default mobile
            breakpoints={{
              768: { slidesPerView: 1 },   // Tablet → 1 card
              1024: { slidesPerView: 3},  // Desktop → 3 cards
            }}
            speed={600}
            allowTouchMove={true}
            grabCursor={true}
            className="absolute inset-0 w-full h-full z-0"
          >
            {vendorBanners.map((banner, index) => (
              <SwiperSlide key={index}>
                <LazyImg
                  src={banner}
                  alt={`Banner ${index + 1}`}
                  className="w-full h-full object-cover object-center"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            {currentVendor?.image ? (
              <LazyImg
                src={currentVendor.image}
                alt={isArabic ? currentVendor?.restaurantArabicName : currentVendor?.restaurantName}
                className="w-full h-full object-cover opacity-30 blur-sm"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700" />
            )}
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

        {/* Foreground Content */}
        <div className="absolute inset-0 flex flex-col justify-between z-20">
          {/* Top Bar */}
          <div className="flex justify-between items-center px-4 pt-5">
            <button
              onClick={() => navigate(-1)}
              aria-label="Back"
              className="bg-white/80 backdrop-blur-md p-2 rounded-full shadow-md hover:bg-white transition-all duration-200"
            >
              <IoIosArrowBack
                className={`w-5 h-5 text-gray-900 ${isArabic ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {/* Vendor Info */}
          <div className="px-4 pb-4">
            <div className="flex items-end gap-4">
              {/* Vendor Image */}
              <div className="relative">
                <LazyImg
                  src={currentVendor?.image}
                  alt={isArabic ? currentVendor?.restaurantArabicName : currentVendor?.restaurantName}
                  className={`w-16 h-16 rounded-xl object-cover border-2 border-white shadow-md ${
                    currentVendor?.isOnline === false ? "grayscale" : ""
                  }`}
                />
                {currentVendor?.isOnline === false && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full shadow">
                    {isArabic ? "مشغول" : "Busy"}
                  </span>
                )}
              </div>

              {/* Vendor Details */}
              <div className="flex-1">
                <h2 className="text-white text-xl font-bold leading-tight line-clamp-1">
                  {isArabic ? currentVendor?.restaurantArabicName : currentVendor?.restaurantName}
                </h2>
                <div className="flex items-center text-sm text-gray-200 mt-1">
                  <MapPin className={`w-4 h-4 ${isArabic ? "-mr-2" : "mr-1"}`} />
                  <span className="line-clamp-1">{currentVendor?.businessAddress}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-4 flex justify-between bg-black/40 backdrop-blur-md rounded-xl px-4 py-2 text-white text-sm shadow-sm">
              {/* Rating */}
              <div className="flex-1 text-center">
                <div className="flex justify-center items-center gap-1 font-medium">
                  <FaStar /> {rating}
                </div>
                <span className="text-xs text-gray-200">{isArabic ? "التقييمات" : "Reviews"}</span>
              </div>

              {/* Distance */}
              <div className="flex-1 text-center border-x border-white/20">
                <div className="font-medium">
                  {currentVendor?.distance === "too far" 
                    ? (isArabic ? "بعيد جداً" : "Too far") 
                    : `${currentVendor?.distance} ${isArabic ? "كم" : "km"}`
                  }
                </div>
                <span className="text-xs text-gray-200">{isArabic ? "المسافة" : "Distance"}</span>
              </div>

              {/* Delivery Time */}
              <div className="flex-1 text-center">
                <div className="font-medium">
                  {currentVendor?.estimatedTime === "no delivery" 
                    ? (isArabic ? "لا يوجد توصيل" : "No delivery") 
                    : `${currentVendor?.estimatedTime} ${isArabic ? "دقيقة" : "min"}`
                  }
                </div>
                <span className="text-xs text-gray-200">{isArabic ? "وقت التوصيل" : "Delivery Time"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodVendorHeader;
