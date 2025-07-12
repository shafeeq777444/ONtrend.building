import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetAllOffers } from "@/shared/services/queries/promotions.query";
import SkeltonFoodOffer from "@/shared/components/skeleton/SkeltonFoodOffer";
import LazyImg from "@/shared/components/LazyImg";

const FoodOffers = () => {
  const { i18n, } = useTranslation();
  const isArabic = i18n.language === "ar";

  const { data: offersData = [], isLoading } = useGetAllOffers();
  const navigate = useNavigate();

  // Sort offers in ascending order based on discountValue
  const offers = [...offersData].sort((a, b) => {
    const discountA = a?.discountValue || 0;
    const discountB = b?.discountValue || 0;
    return discountA - discountB;
  });

  if (isLoading) {
    return <SkeltonFoodOffer />;
  }

  return (
    <div className="px-2 sm:px-4 lg:px-6 py-6 bg-gray-50">
      <h2 className={`text-xl font-bold mb-4 pl-4 ${isArabic ? "text-right" : "text-left"}`}>
        {isArabic ? "عروض" : "Offers"}
      </h2>

      <Swiper
        modules={[Autoplay]}
        slidesPerView={2}
        spaceBetween={16}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        dir={isArabic ? "rtl" : "ltr"} // Swiper direction
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {offers.map((offer, index) => (
          <SwiperSlide key={offer.id || index}>
            <LazyImg
              onClick={() =>
                navigate(`/food/foodDiscountVendor/${offer?.discountValue}`)
              }
              src={offer.imageUrl}
              alt={`offer-${index}`}
              className="rounded-md w-full h-[160px] object-cover shadow cursor-pointer"
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FoodOffers;
