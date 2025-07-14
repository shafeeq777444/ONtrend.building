import React, { useMemo, useState, useEffect } from "react";

import { useGetAllTopVendors } from "../../shared/services/queries/vendors.query";

import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  FreeMode,
  Mousewheel,
  Autoplay,
} from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import "swiper/css/autoplay";
import TopRatedCards from "@/modules/food/components/foodHome/TopRatedCard";
import SkeltonRestuarent from "@/modules/food/components/skeltons/SkeltonRestuarent";

const TopRated = () => {
  const {
    location: { lat, lng },
  } = useSelector((state) => state.user);
  const { data: vendors, isLoading } = useGetAllTopVendors(lat, lng);
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  // ✅ Add local state to manage skeleton visibility
  const [showSkeleton, setShowSkeleton] = useState(true);

  // ✅ Delay hiding the skeleton for smooth transition
  useEffect(() => {
    if (!isLoading && vendors && vendors.length > 0) {
      const timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 300); // 300ms delay before removing skeleton
      return () => clearTimeout(timer); // Cleanup on unmount or change
    }
  }, [isLoading, vendors]);

  const foodTopVendors = useMemo(
    () => vendors?.filter((v) => v.vendorType === "Food/Restaurant") || [],
    [vendors]
  );

  const randomVendors = useMemo(() => {
    return [...foodTopVendors].sort(() => 0.5 - Math.random()).slice(0, 8);
  }, [foodTopVendors]);

  // ✅ Show skeleton if still loading or waiting for delayed hide
  if (showSkeleton || isLoading || !vendors || randomVendors.length === 0) {
    return <SkeltonRestuarent rows={1} heading={true} />;
  }

  return (
    <div className="px-4 py-6 relative w-full">
      {/* Heading */}
      <div className={`mb-6 text-center ${isArabic ? "lg:text-right" : "lg:text-left"}`}>
        <h2 className="text-2xl font-bold text-gray-800 pl-4">
          {isArabic ? "الأعلى تقييماً" : "Top Rated"}
        </h2>
      </div>

      {/* Navigation Buttons */}
      <button
        className={`swiper-button-prev-toprated absolute top-4 ${
          isArabic ? "left-10" : "right-16"
        } z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition`}
      >
        <FiChevronLeft size={22} />
      </button>
      <button
        className={`swiper-button-next-toprated absolute top-4 ${
          isArabic ? "left-22" : "right-4"
        } z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition`}
      >
        <FiChevronRight size={22} />
      </button>

      {/* Vendor Carousel */}
      <Swiper
        spaceBetween={12}
        slidesPerView={4}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".swiper-button-next-toprated",
          prevEl: ".swiper-button-prev-toprated",
        }}
        breakpoints={{
          320: { slidesPerView: 1.2 },
          480: { slidesPerView: 1.6 },
          640: { slidesPerView: 2.3 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        freeMode
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
          releaseOnEdges: true,
        }}
        modules={[Navigation, FreeMode, Mousewheel, Autoplay]}
      >
        {randomVendors.map((vendor) => (
          <SwiperSlide key={vendor.id} className="overflow-visible">
            <TopRatedCards vendor={vendor} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopRated;
