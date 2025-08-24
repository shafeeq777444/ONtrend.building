import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

import { useTranslation } from "react-i18next";
import { useGetAllBanners } from "@/shared/services/queries/promotions.query";
import SkeletonHomeHighlites from "../components/skeletons/SkeletonHomeHighlites";
import LazyImg from "@/shared/components/performanceOptimised/LazyImg";

const Highlites = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const { data, isLoading } = useGetAllBanners();
  const allBannersForHighlite = data?.map((x) => x?.url || "") || [];
  const shuffledAllBannersForHighlites =
    allBannersForHighlite.sort(() => 0.5 - Math.random()) || [];

  if (isLoading || shuffledAllBannersForHighlites.length === 0) {
    return <SkeletonHomeHighlites />;
  }

  return (
    <div className="px-4 py-6 bg-white">
      <h2 className="text-xl font-bold mb-4 pl-4">
        {isArabic ? "أهم العروض" : "Highlights"}
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
            delay: 3000, // delay before moving to next slide
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          speed={2500} // smooth transition animation
          grabCursor={true}
          modules={[Autoplay]}
        >
          {shuffledAllBannersForHighlites.map((imgSrc, index) => (
            <SwiperSlide key={index}>
              <div className="py-2">
                <div className="relative group/card">
                  <LazyImg
                    src={imgSrc}
                    alt={`highlight-${index}`}
                    className="rounded-md w-full h-[260px] object-cover shadow-md 
                      transition-transform duration-500 ease-in-out
                      hover:scale-[1.03] group-hover:z-10"
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

export default Highlites;
