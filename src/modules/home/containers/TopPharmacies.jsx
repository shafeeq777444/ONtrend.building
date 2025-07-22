import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import "swiper/css/autoplay";
import { Navigation, FreeMode, Mousewheel, Autoplay } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import PharmacyCard from "../components/cards/PharmacyCard";
import SkeletonTopPharmacies from "@/shared/components/skeleton/SkeletonTopPharmacies";
import { useGetAllTopVendors } from "@/shared/services/queries/vendors.query";


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

      <button className={`swiper-button-prev-pharmacy hidden md:block ${isArabic?"left-10":"right-14"} custom-nav absolute top-0  z-10 bg-white p-2 rounded-full shadow mt-4 hover:bg-gray-100 transition`}>
        <FiChevronLeft size={20} />
      </button>

      <button className={`swiper-button-next-pharmacy hidden md:block custom-nav absolute top-0 ${isArabic?"left-20":"right-4"}  z-10 bg-white p-2 rounded-full shadow mt-4 hover:bg-gray-100 transition`}>
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
