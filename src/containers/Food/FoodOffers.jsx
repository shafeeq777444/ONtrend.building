import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { useGetAllOffers } from "../../hooks/queries/usePromotions";
import SkeltonFoodOffer from "../../components/skeleton/SkeltonFoodOffer";

const FoodOffers = () => {
  const { data: offers, isLoading } = useGetAllOffers();

  const offerImages = offers?.map((offer) => offer.imageUrl) || [];
  const shuffledOfferImages = offerImages.sort(() => 0.5 - Math.random());

  if (isLoading) {
    return <SkeltonFoodOffer />;
  }

  return (
    <div className="px-4 py-6 bg-white">
      {/* <h2 className="text-xl font-bold mb-4">Offers</h2> */}
      <Swiper
        modules={[Autoplay]}
        slidesPerView={2}
        spaceBetween={16}
        autoplay={{
          delay: 2000, // time between slides
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {shuffledOfferImages.map((imgSrc, index) => (
          <SwiperSlide key={index}>
            <img
              src={imgSrc}
              alt={`offer-${index}`}
              className="rounded-md w-full h-[160px] object-cover shadow"
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FoodOffers;
