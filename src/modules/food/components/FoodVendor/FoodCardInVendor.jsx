import React from 'react';
import { MdOutlineShoppingBag } from "react-icons/md";
import { useTranslation } from "react-i18next";
import LazyImg from '@/shared/components/performanceOptimised/LazyImg';

const FoodCardInVendor = ({ item, venderLogo, onClick, isOnline }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const description = item.description ||
    `A delicious ${item.category?.toLowerCase() || "dish"} prepared with care at ${item.restaurantName || "our restaurant"}.`;

  const shortDesc = description.length > 30
    ? description.slice(0, 30) + (isArabic ? '... المزيد' : '... more')
    : description;

  const hasDiscount = item.discountPercentage > 0;
  
  // Check if item is available based on current time
  const isItemAvailable = () => {
    if (!item.availableTime) return true;
    
    const now = new Date();
    const omanTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Muscat"}));
    const currentHour = omanTime.getHours();
    const currentMinute = omanTime.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;
    
    const fromMinute = item.availableTime.fromMinute || 0;
    const toMinute = item.availableTime.toMinute || 1439; // 23:59 in minutes
    
    return currentTimeInMinutes >= fromMinute && currentTimeInMinutes <= toMinute;
  };
  
  const itemAvailable = isItemAvailable();

  const formatPrice = (amount) =>
    new Intl.NumberFormat(isArabic ? 'ar-EG' : 'en-US', {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }).format(amount);

  return (
    <div
      onClick={isOnline && itemAvailable ? onClick : undefined}
      className={`relative cursor-pointer rounded-xl overflow-hidden shadow-md bg-white group transition-all duration-300 ${
        !isOnline || !itemAvailable 
          ? 'pointer-events-none  border-2 border-dashed border-red-300 shadow-sm' 
          : 'hover:scale-[1.01] hover:shadow-lg'
      }`}
    >
      {/* Unavailable Badge */}
      {(!isOnline || !itemAvailable) && (
        <div className={`absolute top-2 ${isArabic ? 'right-2' : 'left-2'} z-20`}>
          <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            {!isOnline 
              ? (isArabic ? "غير متاح" : "Offline")
              : (isArabic ? "غير متاح في هذا الوقت" : "Not available at this time")
            }
          </div>
        </div>
      )}
      {/* Image */}
      <div className="relative">
        <LazyImg
          src={item.imageUrl}
          alt={item.name}
          placeholder={venderLogo}
          loading="lazy"
          className="w-full h-40 sm:h-48 object-cover"
        />

        {/* Discount Badge */}
        {hasDiscount && (
          <div className={`absolute top-2 ${isArabic ? 'left-2' : 'right-2'} z-20`}>
            <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
              {isArabic ? `% خصم ${item.discountPercentage}` : `${item.discountPercentage}% OFF`}
            </div>
          </div>
        )}

        {/* Gradient + Local Name */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-2 group-hover:opacity-0 transition-opacity duration-300 ${isArabic ? 'text-start' : 'text-end'}`}
        >
          <p className="text-white text-xs sm:text-sm font-semibold">
            {item?.localName}
          </p>
          <p className="text-white text-xs sm:text-sm font-semibold">
            {item?.localTag}
          </p>
        </div>
      </div>

      {/* Card Content */}
      <div className={`p-2 pb-14 ${isArabic ? 'text-right' : 'text-left'}`}>
        <h3 className="text-sm font-semibold truncate">{item.name}</h3>
        <p className="text-xs text-gray-500 mt-1 truncate">{shortDesc}</p>
      </div>

      {/* Price Display */}
      <div className={`absolute bottom-0 ${isArabic ? 'right-0' : 'left-0'} p-2`}>
        {hasDiscount ? (
          <div className={isArabic ? 'text-right' : 'text-left'}>
            <span className="text-sm font-bold text-red-600">
              {isArabic
                ? `ريال ${formatPrice(item.price)}`
                : `OMR ${formatPrice(item.price)}`}
            </span>
            <span className="text-xs text-gray-400 line-through ml-2">
              {isArabic
                ? `ريال ${formatPrice(item.itemPrice)}`
                : `OMR ${formatPrice(item.itemPrice)}`}
            </span>
          </div>
        ) : (
          <span className="text-sm font-bold text-gray-800">
            {isArabic
              ? `ريال ${formatPrice(item.itemPrice)}`
              : `OMR ${formatPrice(item.itemPrice)}`}
          </span>
        )}
      </div>

      {/* Add Button */}
      <div className={`absolute bottom-0 ${isArabic ? 'left-0' : 'right-0'}`}>
        <button 
          disabled={!isOnline || !itemAvailable}
          className={`px-2 py-1 md:px-5 md:py-2 text-xs rounded-tl-xl rounded-br-xl flex items-center gap-1 transition-all duration-200 ${
            !isOnline || !itemAvailable 
              ? 'bg-red-50 text-red-400 cursor-not-allowed border border-red-200' 
              : 'bg-onRed text-white hover:bg-green-600 hover:shadow-md transform hover:scale-105'
          }`}
        >
          <MdOutlineShoppingBag className={`text-base ${!isOnline || !itemAvailable ? 'opacity-50' : ''}`} />
          {!isOnline || !itemAvailable 
            ? (isArabic ? "غير متاح" : "Unavailable")
            : (isArabic ? "أضف" : "Add")
          }
        </button>
      </div>
    </div>
  );
};

export default React.memo(FoodCardInVendor);
