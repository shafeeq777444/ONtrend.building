import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import { Autoplay, FreeMode } from "swiper/modules";
import { useGetAllBanners } from "../../shared/hooks/queries/usePromotions";
import SkeletonHomeHighlites from "../../components/skeleton/SkeletonHomeHighlites";

// Example data

const FoodHighlites = () => {
  const {data:allBanners,isLoading}=useGetAllBanners()
 const foodBanners= allBanners?.filter(banner=>banner.vendorType=="Food/Restaurant") || []
 const bannerImages=foodBanners?.map(banner=>banner.url) || []
  const shuffledBannerImages = bannerImages.sort(() => 0.5 - Math.random()) || [];
if(isLoading){
  return(<SkeletonHomeHighlites/>)
}
  return (
    <div className="px-4 py-6 bg-white">
      <Swiper
        spaceBetween={12}
        slidesPerView={1.1}
        breakpoints={{
          480: { slidesPerView: 1.6 },
          640: { slidesPerView: 2.5 },
          768: { slidesPerView: 3.5 },
          1024: { slidesPerView: 4.5 },
          1280: { slidesPerView: 3.5 },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        centeredSlides={true} 
        freeMode={true}
        loop={true}
        modules={[Autoplay, FreeMode]}
      >
        {shuffledBannerImages.map((imgSrc, index) => (
          <SwiperSlide key={index}>
            <img
              src={imgSrc}
              alt={`highlight-${index}`}
              className="rounded-md w-full h-[260px] object-cover shadow"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FoodHighlites;
