import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetAllOffers } from "@/shared/services/queries/promotions.query";
import SkeltonFoodOffer from "@/shared/components/skeleton/SkeltonFoodOffer";
import LazyImg from "@/shared/components/performanceOptimised/LazyImg";

const FoodOffers = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const { data: offersData = [], isLoading } = useGetAllOffers();
  const navigate = useNavigate();

  // Sort offers ascending by discountValue
  const offers = [...offersData].sort(
    (a, b) => (a?.discountValue || 0) - (b?.discountValue || 0)
  );

  if (isLoading) {
    return <SkeltonFoodOffer />;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 bg-gray-50">
      <h2
        className={`text-xl font-bold mb-4 pl-4 ${
          isArabic ? "text-right" : "text-left"
        }`}
      >
        {isArabic ? "عروض" : "Offers"}
      </h2>

      <div className="relative group">
        <Swiper
          spaceBetween={16}
          slidesPerView={1.2}
          breakpoints={{
            480: { slidesPerView: 1.5 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          speed={2500} // smooth slide transition
          grabCursor={true}
          modules={[Autoplay]}
          dir={isArabic ? "rtl" : "ltr"}
        >
          {offers.map((offer, index) => (
            <SwiperSlide key={offer.id || index}>
              <div className="py-2">
                <div className="relative group/card">
                  <LazyImg
                    onClick={() =>
                      navigate(`/food/foodDiscountVendor/${offer?.discountValue}`)
                    }
                    src={offer.imageUrl}
                    alt={`offer-${index}`}
                    className="rounded-md w-full h-[260px] object-cover shadow-md
                      transition-transform duration-500 ease-in-out
                      group-hover:scale-[1.03] group-hover:z-10 cursor-pointer"
                    loading="lazy"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FoodOffers;
