import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import "swiper/css/autoplay";
import { Navigation, FreeMode, Mousewheel, Autoplay } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import PharmacyCard from "../../components/home/PharmacyCard";
import { useGetAllTopVendors } from "../../hooks/queries/useVendors";
import SkeletonTopPharmacies from "../../components/skeleton/SkeletonTopPharmacies";

// Sample Data
// const pharmacies = [
//     {
//         name: "Apollo Pharmacy",
//         images: ["/images/apollo1.jpg", "/images/apollo2.jpg"],
//     },
//     {
//         name: "MedPlus",
//         images: ["/images/medplus1.jpg", "/images/medplus2.jpg"],
//     },
//     {
//         name: "Netmeds",
//         images: ["/images/netmeds1.jpg", "/images/netmeds2.jpg"],
//     },
//     {
//         name: "1mg Store",
//         images: ["/images/1mg1.jpg", "/images/1mg2.jpg"],
//     },
//     {
//         name: "Apollo Pharmacy",
//         images: ["/images/apollo1.jpg", "/images/apollo2.jpg"],
//     },
//     {
//         name: "MedPlus",
//         images: ["/images/medplus1.jpg", "/images/medplus2.jpg"],
//     },
//     {
//         name: "Netmeds",
//         images: ["/images/netmeds1.jpg", "/images/netmeds2.jpg"],
//     },
//     {
//         name: "1mg Store",
//         images: ["/images/1mg1.jpg", "/images/1mg2.jpg"],
//     },
// ];

const TopPharmacies = () => {
    const { data: vendors, isLoading } = useGetAllTopVendors();
    const topPharmacies = vendors?.filter((vendor) => vendor.vendorType == "Health & Beauty") || [];
    console.log(topPharmacies, "--pharmacies");
    if(isLoading){
        return(<SkeletonTopPharmacies/>)
    }

    return (
          <div className="px-4 py-6 relative bg-white">
            <h2 className="text-xl font-bold mb-4">Top Pharmacies</h2>

            {/* Custom Prev Button */}
            <button className="swiper-button-prev-pharmacy custom-nav absolute top-0 right-14 z-10 bg-white p-2 rounded-full shadow mt-4 hover:bg-gray-100 transition">
                <FiChevronLeft size={20} />
            </button>

            {/* Custom Next Button */}
            <button className="swiper-button-next-pharmacy custom-nav absolute top-0 right-4 z-10 bg-white p-2 rounded-full shadow mt-4 hover:bg-gray-100 transition">
                <FiChevronRight size={20} />
            </button>

            {/* Swiper */}
            <Swiper
                spaceBetween={16}
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
                        <PharmacyCard name={pharmacy.restaurantName} images={pharmacy.bannerImage} isOnline={pharmacy.isOnline} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TopPharmacies;
