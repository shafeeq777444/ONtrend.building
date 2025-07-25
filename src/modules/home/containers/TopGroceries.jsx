import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import { Navigation, FreeMode, Mousewheel } from "swiper/modules";
import { FiChevronLeft, FiChevronRight, FiShoppingBag } from "react-icons/fi";
import { MapPin, Clock } from "lucide-react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useGetAllTopVendors } from "@/shared/services/queries/vendors.query";
import SkeletonTopGroceries from "@/shared/components/skeleton/SkeletonTopGroceries";
import RatingStars from "@/shared/components/common/RatingStar";
import FavoriteButton from "@/shared/components/common/FavouriteButton";
import LazyImg from "@/shared/components/LazyImg";

const TopGroceries = () => {
    const {
        location: { lat, lng },
    } = useSelector((state) => state.user);

    const { data: vendors, isLoading, error } = useGetAllTopVendors(lat, lng);
    const { i18n } = useTranslation();
    const isArabic = i18n.language === "ar";

    const topGroceries = vendors?.filter((vendor) => vendor.vendorType === "Grocery") || [];

    if (isLoading) return <SkeletonTopGroceries />;
    if (error)
        return (
            <div className="px-4 py-6 text-center">
                <p className="text-red-600 font-semibold">
                    {isArabic
                        ? "فشل تحميل المتاجر، يرجى المحاولة لاحقًا"
                        : "Failed to load top groceries. Please try again later."}
                </p>
            </div>
        );

    return (
        <div className="px-4 relative" dir={isArabic ? "rtl" : "ltr"}>
            <h2 className="text-xl font-bold mb-4 pl-4">{isArabic ? "أفضل متاجر البقالة" : "Top Groceries"}</h2>

            {/* Navigation Buttons */}
            <button
                className={`swiper-button-prev-grocery absolute hidden md:block top-0  ${
                    isArabic ? "left-10" : "right-14"
                }  z-10 bg-white p-2 rounded-full shadow mt-4 hover:bg-gray-100 transition`}
            >
                <FiChevronLeft size={20} />
            </button>
            <button
                className={`swiper-button-next-grocery absolute  hidden md:block top-0 ${
                    isArabic ? "left-20" : "right-4"
                }  z-10 bg-white p-2 rounded-full shadow mt-4 hover:bg-gray-100 transition`}
            >
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
                {topGroceries.map((item) => {
                    const averageRating = item.Ratings && item.totalRatings ? item.Ratings / item.totalRatings : 0;

                    return (
                        <SwiperSlide key={item.id}>
                            <div className="p-2">
                                <div className="group relative rounded-lg shadow-md hover:shadow-lg transition-all flex flex-col items-center text-center hover:scale-[1.02] duration-200 ease-in-out">
                                    {/* Image Block */}
                                    <div className="w-full h-44 rounded-lg overflow-hidden mb-3 relative">
                                        {/* Favorite Button */}
                                        <div className={`absolute top-0 ${isArabic ? "left-16" : "right-2"} z-20`}>
                                            <FavoriteButton />
                                        </div>

                                        {/* Vendor Logo */}
                                        {item.image && (
                                            <div
                                                className={`absolute top-2 ${
                                                    isArabic ? "right-2" : "left-2"
                                                } z-20 w-10 h-10 rounded-full overflow-hidden border border-white shadow-md`}
                                            >
                                                <LazyImg
                                                    src={item.image}
                                                    alt={`${
                                                        isArabic ? item.restaurantArabicName : item.restaurantName
                                                    } logo`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}

                                        {/* Main Image */}
                                        <LazyImg
                                            src={item.bannerImage?.[0]}
                                            alt={isArabic ? item.restaurantArabicName : item.restaurantName}
                                            loading="lazy"
                                            className="w-full h-full object-cover"
                                        />

                                        {/* Shop Closed Overlay */}
                                        {!item.isOnline && (
                                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-default z-20">
                                                <div className="text-xs text-gray-300 italic bg-black/20 backdrop-blur-xs rounded-full px-2 py-1">
                                                    {isArabic ? "المتجر مغلق" : "Shop closed"}
                                                </div>
                                            </div>
                                        )}

                                        {/* Bottom Ratings, Time, Distance */}
                                        <div
                                            className={`absolute bottom-2 ${
                                                isArabic ? "right-2 items-end" : "left-2 items-start"
                                            } z-20 flex flex-col gap-1 text-white text-xs`}
                                        >
                                            {averageRating > 0 && (
                                                <div className="flex items-center gap-1 bg-black/20 px-2 py-1 rounded-full">
                                                    <RatingStars rating={averageRating} />
                                                    <span>({item.Ratings || 0})</span>
                                                </div>
                                            )}

                                            {(item.estimatedTime || item.distance) && (
                                                <div className="flex items-center gap-2 bg-black/20 px-2 py-1 rounded-full">
                                                    {item.estimatedTime && (
                                                        <div className="flex items-center gap-1">
                                                            <Clock size={12} />
                                                            <span>{item.estimatedTime}</span>
                                                        </div>
                                                    )}
                                                    {item.distance && (
                                                        <div className="flex items-center gap-1">
                                                            <MapPin size={12} />
                                                            <span>{item.distance} كم</span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Name */}
                                    <div className="font-semibold text-sm text-gray-800 line-clamp-1">
                                        {isArabic ? item.restaurantArabicName : item.restaurantName}
                                    </div>

                                    {/* Online Status */}
                                    {item.isOnline ? (
                                        <div className="flex items-center gap-1 p-2 text-sm font-medium text-green-600">
                                            <FiShoppingBag size={16} />
                                            {isArabic ? "تسوق الآن" : "Shop Now"}
                                        </div>
                                    ) : (
                                        <div className="text-xs text-gray-400 p-2 italic">
                                            {isArabic ? "المتجر مغلق" : "Shop closed"}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default TopGroceries;
