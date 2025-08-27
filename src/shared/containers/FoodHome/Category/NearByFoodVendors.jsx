import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import "swiper/css/grid";

import { Navigation, FreeMode, Mousewheel, Grid } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";


import SkeltonNearRestuarent from "../../../../modules/food/components/skeltons/SkeltonRestuarent";

import { useSelector } from "react-redux";

import { useTranslation } from "react-i18next";
import { auth } from "@/lib/firebase/config";
import RestaurantCard from "@/modules/food/components/cards/RestaurantCard";
import { useWishlist } from "@/modules/wishlist/services/queries/wishlist.query";
import { useGetAllFoodVendors } from "@/modules/food/services/queries/useGetAllFoodVendors";
import EmptyStateCard from "@/shared/components/messages/EmptyStateCard";



const NewVendors = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const currentUserId = auth.currentUser?.uid;

  const { data: wishlist = [] } = useWishlist(currentUserId);
  const wishlistIds = useMemo(() => new Set(wishlist.map((item) => item.id)), [wishlist]);

  const {
    location: { lat, lng },
  } = useSelector((state) => state.user);

  const { data: allFoodvendors, isLoading } = useGetAllFoodVendors(lat, lng);

  const newVendors = useMemo(() => {
    if (!allFoodvendors) return [];
    return allFoodvendors
      .slice()
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 20);
  }, [allFoodvendors]);

  if (isLoading) return <SkeltonNearRestuarent heading={false}/>;

  if(!isLoading && newVendors.length === 0) {
    return (
      <div className="px-4 py-6 relative w-full">
        {/* Heading */}
       
        
        <EmptyStateCard
          heading={isArabic ? "لا توجد مطاعم قريبة" : "No nearby vendors available"}
          description={
            isArabic
              ? "لا توجد مطاعم متاحة في منطقتك حاليًا. جرب توسيع نطاق البحث أو تحقق لاحقًا."
              : "There are no vendors available in your area right now. Try expanding your search radius or check back later."
          }
          lottieSrc="/lotties/errorOrWarnings/Delivery on the way.json"
          notify={false}
          width="w-26"
          height="h-26"
        />
      </div>
    )
  }


  return (
    <div className="px-4 py-6 relative w-full">
      {/* Heading */}
      <h2
        className={`text-xl font-bold mb-4 pl-4 ${
          isArabic ? "text-right" : "text-left"
        }`}
      >
        {isArabic ? "المطاعم القريبة" : "Nearby Vendors"}
      </h2>

      {/* Navigation Buttons */}
      <button
        className={`hidden md:block swiper-button-prev-restuarent absolute -top-12 ${
          isArabic ? "left-10" : "right-16"
        } z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition`}
      >
        <FiChevronLeft size={22} />
      </button>
      <button className={`hidden md:block swiper-button-next-restuarent absolute -top-12 ${
          isArabic ? "left-22" : "right-4"
        } z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition`}>
        <FiChevronRight size={22} />
      </button>

      <Swiper
        spaceBetween={1}
        slidesPerView={4}
        grid={{ rows: 2, fill: "row" }}
        breakpoints={{
          320: { slidesPerView: 1.5 },
          480: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 4 },
        }}
        navigation={{
          nextEl: ".swiper-button-next-restuarent",
          prevEl: ".swiper-button-prev-restuarent",
        }}
        freeMode
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
          releaseOnEdges: true,
        }}
        modules={[Navigation, FreeMode, Mousewheel, Grid]}
      >
        {newVendors.map((restaurant) => (
          <SwiperSlide key={restaurant.id} className="overflow-visible">
            <RestaurantCard
              isLiked={wishlistIds.has(restaurant.id)}
              restaurant={restaurant}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewVendors;
