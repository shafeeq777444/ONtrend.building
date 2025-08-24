import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import { Autoplay, FreeMode } from "swiper/modules";
import { FiImage } from "react-icons/fi";

const SkeltonFoodOffer = () => {
  return (
  <div className="px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 dark:bg-zinc-800">
  {/* Skeleton title block */}
  <div className="animate-pulse mb-4 w-32 h-6 bg-gray-300 dark:bg-zinc-600 rounded"></div>

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
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    }}
    centeredSlides={true}
    freeMode={true}
    loop={true}
    modules={[Autoplay, FreeMode]}
  >
    {[...Array(5)].map((_, index) => (
      <SwiperSlide key={index}>
        <div className="py-2">
          <div className="animate-pulse relative w-full h-[260px] rounded-md bg-gray-200 dark:bg-zinc-600 shadow-md flex items-center justify-center">
            <FiImage className="text-5xl text-gray-400" />
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>

  );
};

export default SkeltonFoodOffer;
