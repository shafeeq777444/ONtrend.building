import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import { Navigation, FreeMode, Mousewheel } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import SkeltonTopRestuarent from "../../components/skeleton/SkeltonNearRestuarent";
import RestuarentCard from "../../components/RestuarentCard";
import { useGetAllTopVendors } from "../../hooks/queries/useVendors";
import { useSelector } from "react-redux";
import { useWishlist } from "@/hooksDemo/userMutation";
import { useTranslation } from "react-i18next";

const TopRestaurants = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const { data: wishlist = [] } = useWishlist("user12");
  const wishlistIds = useMemo(
    () => new Set(wishlist.map((item) => item.id)),
    [wishlist]
  );

  const {
    location: { lat, lng },
  } = useSelector((state) => state.user);

  const { data: vendors, isLoading } = useGetAllTopVendors(lat, lng);
  const topRestaurants =
    vendors?.filter((vendor) => vendor.vendorType === "Food/Restaurant") || [];

  if (isLoading) {
    return <SkeltonTopRestuarent />;
  }

  return (
    <div className="px-4 py-6 relative w-full">
      <h2 className="text-xl font-bold mb-6 text-black">
        {isArabic ? "أفضل المطاعم" : "Top Restaurants"}
      </h2>

      {/* Custom Navigation Buttons (Swapped class names when Arabic) */}
      <button
        className={`${
          isArabic
            ? "swiper-button-next-restuarent left-10"
            : "swiper-button-prev-restuarent right-14"
        } absolute top-1 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition`}
      >
        <FiChevronLeft size={22} />
      </button>

      <button
        className={`${
          isArabic
            ? "swiper-button-prev-restuarent left-20"
            : "swiper-button-next-restuarent right-4"
        } absolute top-1 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition`}
      >
        <FiChevronRight size={22} />
      </button>

      <Swiper
        spaceBetween={1}
        slidesPerView={1.2}
        breakpoints={{
          480: { slidesPerView: 1.5 },
          640: { slidesPerView: 2.5 },
          768: { slidesPerView: 3.5 },
          1024: { slidesPerView: 4.5 },
          1280: { slidesPerView: 4.6 },
          1536: { slidesPerView: 4.5 },
        }}
        navigation={{
          nextEl: isArabic
            ? ".swiper-button-prev-restuarent"
            : ".swiper-button-next-restuarent",
          prevEl: isArabic
            ? ".swiper-button-next-restuarent"
            : ".swiper-button-prev-restuarent",
        }}
        freeMode
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
          releaseOnEdges: true,
        }}
        modules={[Navigation, FreeMode, Mousewheel]}
        dir={isArabic ? "rtl" : "ltr"} // optional RTL support
      >
        {topRestaurants.map((restaurant) => (
          <SwiperSlide key={restaurant.id} className="overflow-visible">
            <RestuarentCard
              restaurant={restaurant}
              topRestuarents={true}
              isLiked={wishlistIds.has(restaurant.id)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopRestaurants;
