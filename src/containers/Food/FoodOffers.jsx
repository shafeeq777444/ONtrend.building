// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/autoplay";
// import { Autoplay, FreeMode } from "swiper/modules";
// import { useGetAllOffers } from "../../hooks/queries/usePromotions";
// import SkeltonFoodOffer from "../../components/skeleton/SkeltonFoodOffer";

// // Example data

// const FoodOffers = () => {
//     const { data: offers, isLoading } = useGetAllOffers();
//     const offerIMages = offers?.map((offer) => offer.imageUrl) || [];

//     if (isLoading) {
//         return <SkeltonFoodOffer />;
//     }

//     return (
//         <div className="px-4 py-6 bg-white">
//             <h2 className="text-xl font-bold mb-4 ">Offers</h2>
//             <Swiper
//             // className="linear-swiper"
//                 spaceBetween={12}
//                 slidesPerView={1.1}
//                 breakpoints={{
//                     480: { slidesPerView: 1.6 },
//                     640: { slidesPerView: 2.5 },
//                     768: { slidesPerView: 3.5 },
//                     1024: { slidesPerView: 4.5 },
//                     1280: { slidesPerView: 3.5 },
//                 }}
//                 autoplay={{
//                     delay: 0,
//                     disableOnInteraction: false,
//                     pauseOnMouseEnter: true,
//                 }}
//                 centeredSlides={true}
//                 speed={4000}
//                 freeMode={true}
//                 freeModeMomentum={false}
//                 allowTouchMove={true}
//                 loop={true}
//                 // style={{ "--swiper-transition-timing-function": "linear" }}
//                 modules={[Autoplay, FreeMode]}
//             >
//                 {offerIMages.map((imgSrc, index) => (
//                     <SwiperSlide key={index}>
//                         <img
//                             src={imgSrc}
//                             loading="lazy"
//                             alt={`highlight-${index}`}
//                             className="rounded-md w-full h-[160px] object-cover shadow"
//                         />
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//         </div>
//     );
// };

// export default FoodOffers;

import React from "react";
import Marquee from "react-fast-marquee";
import { useGetAllOffers } from "../../hooks/queries/usePromotions";
import SkeltonFoodOffer from "../../components/skeleton/SkeltonFoodOffer";

const FoodOffers = () => {
  const { data: offers, isLoading } = useGetAllOffers();
  const offerImages = offers?.map((offer) => offer.imageUrl) || [];
    const shuffledOfferImages = offerImages.sort(() => 0.5 - Math.random()) || [];
    

  if (isLoading) {
    return <SkeltonFoodOffer />;
  }

  return (
    <div className="px-4 py-6 bg-white">
      <h2 className="text-xl font-bold mb-4">Offers</h2>
      <Marquee
        speed={50}
        autoFill={true}
        gradient={false}
        pauseOnHover={false}
      >
        {shuffledOfferImages.map((imgSrc, index) => (
          <div key={index} className="mx-2">
            <img
              src={imgSrc}
              alt={`offer-${index}`}
              className="rounded-md w-[280px] h-[160px] object-cover shadow"
              loading="lazy"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default FoodOffers;
