import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { useGetAllOffers } from "../../hooks/queries/usePromotions";
import SkeltonFoodOffer from "../../components/skeleton/SkeltonFoodOffer";
import { useNavigate } from "react-router-dom";

const FoodOffers = () => {
  const { data: offers = [], isLoading } = useGetAllOffers();
  const navigate = useNavigate();

  // Shuffle offers
  const shuffledOffers = [...offers].sort(() => 0.5 - Math.random());

  if (isLoading) {
    return <SkeltonFoodOffer />;
  }

  return (
    <div className="px-2 sm:px-4 lg:px-6 py-6 bg-gray-50">
      <h2 className="text-xl font-bold mb-4">Offers</h2>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={2}
        spaceBetween={16}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {shuffledOffers.map((offer, index) => (
          <SwiperSlide key={offer.id || index}>
            <img
            onClick={()=>{navigate(`/food/foodDiscountVendor/${offer?.discountValue}`)}}
              // onClick={() => navigate(`/food/${offer.id}`)}
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
