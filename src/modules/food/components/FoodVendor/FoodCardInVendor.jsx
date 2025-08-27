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
      onClick={isOnline && itemAvailable ? onClick : (e) => e.preventDefault()}
      className={`relative rounded-xl overflow-hidden shadow-sm bg-white group transition-shadow duration-200 ${
        !isOnline || !itemAvailable 
          ? 'pointer-events-none border-2 border-dashed border-red-300 opacity-75 cursor-not-allowed' 
          : 'cursor-pointer hover:shadow-md border border-gray-100'
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
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2 ${isArabic ? 'text-start' : 'text-end'}`}
        >
          <p className="text-white text-xs font-medium drop-shadow-sm">
            {item?.localName}
          </p>
          <p className="text-white text-xs font-medium drop-shadow-sm">
            {item?.localTag}
          </p>
        </div>
      </div>

      {/* Card Content */}
      <div className={`p-3 pb-14 ${isArabic ? 'text-right' : 'text-left'}`}>
        <h3 className="text-sm font-semibold text-gray-900 truncate leading-tight">{item.name}</h3>
        <p className="text-xs text-gray-600 mt-1.5 truncate leading-relaxed">{shortDesc}</p>
      </div>

      {/* Price Display */}
      <div className={`absolute bottom-0 ${isArabic ? 'right-0' : 'left-0'} p-3`}>
        {hasDiscount ? (
          <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : 'flex-row'}`}>
            <span className="text-sm font-bold text-emerald-600">
              {isArabic
                ? `ريال ${formatPrice(item.price)}`
                : `OMR ${formatPrice(item.price)}`}
            </span>
            <span className="text-xs text-gray-400 line-through">
              {isArabic
                ? `ريال ${formatPrice(item.itemPrice)}`
                : `OMR ${formatPrice(item.itemPrice)}`}
            </span>
          </div>
        ) : (
          <span className="text-sm font-bold text-gray-900">
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
          className={`px-3 py-2 md:px-4 md:py-2.5 text-xs font-medium rounded-tl-xl ${!isOnline || !itemAvailable ? 'opacity-0 md:opacity-100' : ''} rounded-br-xl flex items-center gap-1.5 transition-colors duration-200 ${
            !isOnline || !itemAvailable 
              ? 'bg-red-50 text-red-400 cursor-not-allowed border border-red-200' 
              : 'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800'
          }`}
        >
          <MdOutlineShoppingBag className={`text-sm ${!isOnline || !itemAvailable ? 'opacity-50 display-none' : ''}`} />
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
