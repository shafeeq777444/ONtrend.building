import React from 'react';
import { MdOutlineShoppingBag } from "react-icons/md";
import { useTranslation } from "react-i18next";
import LazyImg from '@/shared/components/LazyImg';

const FoodCardInVendor = ({ item, venderLogo, onClick, isOnline }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const description = item.description ||
    `A delicious ${item.category?.toLowerCase() || "dish"} prepared with care at ${item.restaurantName || "our restaurant"}.`;

  const shortDesc = description.length > 30
    ? description.slice(0, 30) + (isArabic ? '... المزيد' : '... more')
    : description;

  const hasDiscount = item.discountPercentage > 0;

  const formatPrice = (amount) =>
    new Intl.NumberFormat(isArabic ? 'ar-EG' : 'en-US', {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }).format(amount);

  return (
    <div
      onClick={isOnline ? onClick : undefined}
      tabIndex={isOnline ? 0 : -1}
      className={`w-full max-w-xs sm:max-w-sm md:max-w-xs bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transition hover:shadow-xl focus:ring-2 focus:ring-onRed outline-none ${
        !isOnline ? 'grayscale pointer-events-none opacity-70' : 'cursor-pointer'
      }`}
      aria-disabled={!isOnline}
    >
      {/* Image Section */}
      <div className="relative aspect-[4/3] w-full bg-gray-100">
        <LazyImg
          src={item.imageUrl}
          alt={item.name}
          placeholder={venderLogo}
          loading="lazy"
          className="w-full h-full object-cover rounded-t-2xl"
        />
        {/* Discount Badge */}
        {hasDiscount && (
          <div className={`absolute top-3 ${isArabic ? 'left-3' : 'right-3'} z-20`}> 
            <span className="bg-red-500 text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full shadow-lg border-2 border-white">
              {isArabic ? `% خصم ${item.discountPercentage}` : `${item.discountPercentage}% OFF`}
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 px-3 py-2 gap-1 sm:gap-2">
        <h3 className="text-base sm:text-lg font-semibold truncate" title={item.name}>{item.name}</h3>
        <p className="text-xs sm:text-sm text-gray-500 truncate" title={description}>{shortDesc}</p>
        {/* Local Name/Tag */}
        {(item?.localName || item?.localTag) && (
          <div className={`flex flex-col ${isArabic ? 'items-start' : 'items-end'} mt-1`}>
            {item?.localName && <span className="text-xs text-gray-700 font-medium">{item.localName}</span>}
            {item?.localTag && <span className="text-xs text-gray-400">{item.localTag}</span>}
          </div>
        )}
      </div>

      {/* Price & Add Button Row */}
      <div className={`flex items-center justify-between px-3 py-2 border-t border-gray-100 bg-white ${isArabic ? 'flex-row-reverse' : ''}`}>
        {/* Price Display */}
        <div className="flex flex-col items-start">
          {hasDiscount ? (
            <>
              <span className="text-base font-bold text-red-600">
                {isArabic
                  ? `ريال ${formatPrice(item.price)}`
                  : `OMR ${formatPrice(item.price)}`}
              </span>
              <span className="text-xs text-gray-400 line-through">
                {isArabic
                  ? `ريال ${formatPrice(item.itemPrice)}`
                  : `OMR ${formatPrice(item.itemPrice)}`}
              </span>
            </>
          ) : (
            <span className="text-base font-bold text-gray-800">
              {isArabic
                ? `ريال ${formatPrice(item.itemPrice)}`
                : `OMR ${formatPrice(item.itemPrice)}`}
            </span>
          )}
        </div>
        {/* Add Button */}
        <button
          className="bg-onRed text-white px-4 py-2 text-sm rounded-xl flex items-center gap-2 hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-green-400"
          aria-label={isArabic ? 'أضف إلى السلة' : 'Add to cart'}
          disabled={!isOnline}
        >
          <MdOutlineShoppingBag className="text-lg" />
          <span className="font-semibold">{isArabic ? "أضف" : "Add"}</span>
        </button>
      </div>
    </div>
  );
};

export default React.memo(FoodCardInVendor);
