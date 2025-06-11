import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import { Autoplay, FreeMode } from "swiper/modules";
import { useGetAllBanners } from "../../hooks/queries/usePromotions";
import SkeletonHomeHighlites from "../../components/skeleton/SkeletonHomeHighlites";

const Highlites = () => {
    const { data, isLoading } = useGetAllBanners();
    const allBannersForHighlite = data?.map((x) => x?.url || "") || [];

    if (isLoading) {
        return <SkeletonHomeHighlites />;
    }

    return (
        <div className="px-4 py-6 bg-white ">
            <h2 className="text-xl font-bold mb-4">Highlights</h2>

            {/* Parent wrapper with group-hover logic */}
            <div className="relative group  ">
                <Swiper
                    spaceBetween={12}
                    slidesPerView={1.2}
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
                    {allBannersForHighlite.map((imgSrc, index) => (
                        <SwiperSlide key={index}>
                            <div className="py-2 ">
                                <div className="relative group/card ">
                                    <img
                                        src={imgSrc}
                                        alt={`highlight-${index}`}
                                        className="rounded-xl w-full h-[260px]  object-cover shadow transition-all duration-300 ease-in-out group-hover:blur-xs group-hover/card:blur-none group-hover/card:scale-[1.02] group-hover/card:z-10"
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
