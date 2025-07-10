import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import "swiper/css/autoplay";
import { Navigation, FreeMode, Mousewheel, Autoplay } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import PharmacyCard from "../../shared/components/home/PharmacyCard";
import { useGetAllTopVendors } from "../../services/queries/vendors.query";
import SkeletonTopPharmacies from "../../components/skeleton/SkeletonTopPharmacies";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const TopPharmacies = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const {
    location: { lat, lng },
  } = useSelector((state) => state.user);

  const { data: vendors, isLoading } = useGetAllTopVendors(lat, lng);
  const topPharmacies =
    vendors?.filter((vendor) => vendor.vendorType === "Health & Beauty") || [];

  if (isLoading) {
    return <SkeletonTopPharmacies />;
  }

  return (
    <div className="px-4 py-6 relative bg-white">
      <h2 className="text-xl font-bold mb-4">
        {isArabic ? "أفضل الصيدليات" : "Top Pharmacies"}
      </h2>

      <button className={`swiper-button-prev-pharmacy ${isArabic?"left-10":"right-14"} custom-nav absolute top-0  z-10 bg-white p-2 rounded-full shadow mt-4 hover:bg-gray-100 transition`}>
        <FiChevronLeft size={20} />
      </button>

      <button className={`swiper-button-next-pharmacy custom-nav absolute top-0 ${isArabic?"left-20":"right-4"}  z-10 bg-white p-2 rounded-full shadow mt-4 hover:bg-gray-100 transition`}>
        <FiChevronRight size={20} />
      </button>

      <Swiper
        spaceBetween={1}
        slidesPerView={1.6}
        breakpoints={{
          480: { slidesPerView: 1.5 },
          640: { slidesPerView: 2.5 },
          768: { slidesPerView: 3.5 },
          1024: { slidesPerView: 4.5 },
          1280: { slidesPerView: 5.5 },
          1536: { slidesPerView: 6.5 },
        }}
        navigation={{
          nextEl: ".swiper-button-next-pharmacy",
          prevEl: ".swiper-button-prev-pharmacy",
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        freeMode={true}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
          releaseOnEdges: true,
        }}
        modules={[Navigation, FreeMode, Mousewheel, Autoplay]}
      >
        {topPharmacies.map((pharmacy, idx) => (
          <SwiperSlide key={idx}>
            <PharmacyCard pharmacy={pharmacy} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopPharmacies;
