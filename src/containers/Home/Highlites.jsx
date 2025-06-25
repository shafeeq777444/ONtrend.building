import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import { Autoplay, FreeMode } from "swiper/modules";
import { useGetAllBanners } from "../../hooks/queries/usePromotions";
import SkeletonHomeHighlites from "../../components/skeleton/SkeletonHomeHighlites";
import { useTranslation } from "react-i18next";

const Highlites = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const { data, isLoading } = useGetAllBanners();
  const allBannersForHighlite = data?.map((x) => x?.url || "") || [];
  const shuffledAllBannersForHighlites =
    allBannersForHighlite.sort(() => 0.5 - Math.random()) || [];

  if (isLoading) {
    return (
      <SkeletonHomeHighlites text={isArabic ? "أهم العروض" : "Highlights"} />
    );
  }

  return (
    <div className="px-4 py-6 bg-white">
      <h2 className="text-xl font-bold mb-4">
        {isArabic ? "أهم العروض" : "Highlights"}
      </h2>

      <div className="relative group">
        <Swiper
          spaceBetween={6}
          slidesPerView={1.2}
          breakpoints={{
            480: { slidesPerView: 1.2 },
            640: { slidesPerView: 2.1 },
            768: { slidesPerView: 3.1 },
            1024: { slidesPerView: 4.1 },
            1280: { slidesPerView: 3.1 },
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
          // Optional: enable RTL direction
          // dir={isArabic ? "rtl" : "ltr"}
        >
          {shuffledAllBannersForHighlites.map((imgSrc, index) => (
            <SwiperSlide key={index}>
              <div className="py-2">
                <div className="relative group/card">
                  <img
                    src={imgSrc}
                    loading="lazy"
                    alt={`highlight-${index}`}
                    className="rounded-md w-full h-[210px] object-cover shadow transition-all duration-300 ease-in-out group-hover:blur-[1.5px] group-hover/card:blur-none group-hover/card:scale-[1.02] group-hover/card:z-10"
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
