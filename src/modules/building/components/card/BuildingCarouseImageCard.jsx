
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useTranslation } from 'react-i18next';

export default function BuildingCarouseImageCard({ building }) {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  // Fallback values
  const fallbackData = {
    name_ar: "فندق فاخر",
    name_en: "Luxury Hotel",
    starting_amount: 100,
    star_rating: 4,
    images: [
      "https://plus.unsplash.com/premium_photo-1676823547752-1d24e8597047?fm=jpg&q=60&w=3000",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?fm=jpg&q=60&w=3000",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?fm=jpg&q=60&w=3000"
    ]
  };

  return (
    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
      {/* Overlay Text Content */}
      <div
        className={`absolute bottom-6 z-20 text-white max-w-md ${
          isArabic ? 'right-6 text-right' : 'left-6'
        }`}
      >
        <h2 className="text-2xl font-bold">
          {isArabic ? (building?.name_ar || fallbackData.name_ar) : (building?.name_en || fallbackData.name_en)}
        </h2>
        <div className="text-yellow-400 text-lg mt-1">
          {'★'.repeat(building?.star_rating || fallbackData.star_rating)}
        </div>
        <div className="mt-2 inline-block bg-white text-black px-4 py-1 text-sm rounded-full">
          {isArabic ? 'يبدأ من' : 'Start from'} {building?.starting_amount || fallbackData.starting_amount} OMR
        </div>
      </div>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        direction="vertical"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        pagination={{ 
          clickable: true,
          type: 'bullets'
        }}
        className="w-full h-full"
      >
        {(building?.building_media?.[0]?.images || fallbackData.images).length > 0 ? (
          (building?.building_media?.[0]?.images || fallbackData.images).map((imageUrl, index) => (
            <SwiperSlide key={`slide-${index}`}>
              <div
                className="w-full h-full bg-cover bg-center relative"
                style={{ backgroundImage: `url(${imageUrl})` }}
              >
                <div className="absolute inset-0 bg-black/40" />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-sm">
              {isArabic ? 'لا توجد صور متاحة' : 'No images available'}
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}
