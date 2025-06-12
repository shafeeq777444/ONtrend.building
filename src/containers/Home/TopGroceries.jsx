import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import { Navigation, FreeMode, Mousewheel } from "swiper/modules";
import { FiChevronLeft, FiChevronRight, FiClock, FiShoppingBag } from "react-icons/fi";
import { useGetAllTopVendors } from "../../hooks/queries/useVendors";
import SkeletonTopGroceries from "../../components/skeleton/SkeletonTopGroceries";
import FavoriteButton from "../../components/common/FavouriteButton";

const TopGroceries = () => {
    const { data: vendors, isLoading, error } = useGetAllTopVendors();
    const topGroceries = vendors?.filter((vendor) => vendor.vendorType === "Grocery") || [];
    console.log(topGroceries, "--top grocerises");

    if (isLoading) return <SkeletonTopGroceries />;
    if (error)
        return (
            <div className="px-4 py-6 text-center">
                <p className="text-red-600 font-semibold">Failed to load top groceries. Please try again later.</p>
            </div>
        );

    return (
        <div className="px-4  relative">
            <h2 className="text-xl font-bold mb-4">Top Groceries</h2>

            {/* Navigation Buttons */}
            <button className="swiper-button-prev-grocery absolute top-0 right-14 z-10 bg-white p-2 rounded-full shadow mt-4 hover:bg-gray-100 transition">
                <FiChevronLeft size={20} />
            </button>
            <button className="swiper-button-next-grocery absolute top-0 right-4 z-10 bg-white p-2 rounded-full shadow mt-4 hover:bg-gray-100 transition">
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
                    nextEl: ".swiper-button-next-grocery",
                    prevEl: ".swiper-button-prev-grocery",
                }}
                freeMode={true}
                mousewheel={{
                    forceToAxis: true,
                    sensitivity: 1,
                    releaseOnEdges: true,
                }}
                modules={[Navigation, FreeMode, Mousewheel]}
            >
                {topGroceries.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className="p-2">
                            <div className="group relative rounded-md shadow hover:shadow-md transition flex flex-col items-center text-center hover:scale-[1.02] duration-200 ease-in-out">
                                <div className="w-full h-42 rounded-md overflow-hidden mb-3 relative">
                                    <FavoriteButton />
                                    <img
                                        src={item.bannerImage[0]}
                                        alt={item.restaurantName}
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Shop Closed Overlay */}
                                    {!item.isOnline && (
                                        <div className="absolute inset-0 bg-black/30 bg-opacity-50 flex items-center cursor-default justify-center">
                                            <div className="text-xs absolute text-gray-400 italic bg-black/20 backdrop-blur-xs rounded-full px-1 py-0.5">Shop closed</div>
                                        </div>
                                    )}

                                    {/* Hover Overlay with "Shop Now" */}
                                    {item.isOnline && (
                                        <div className="absolute inset-0 flex flex-col justify-end items-center pointer-events-none">
                                            <div className="w-full bg-gradient-to-t from-black/70 via-black/30 to-transparent h-full p-2 flex justify-center pointer-events-auto transition-opacity duration-300 opacity-100 group-hover:opacity-0 absolute bottom-0">
                                                <h3 className="text-sm font-semibold text-white absolute  bottom-4">
                                                    {item.restaurantName}
                                                </h3>
                                            </div>
                                        </div>
                                    )}
                                   
                                </div>
                                 {item.isOnline ? (
                                        <div className="flex items-center gap-1 p-2 text-sm font-medium  text-green-600 ">
                                            <FiShoppingBag size={16} /> Shop Now
                                        </div>
                                    ) : (
                                        <div className="text-xs text-gray-400 p-2 italic ">Shop closed</div>
                                    )}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TopGroceries;
