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
      className={`relative cursor-pointer rounded-xl overflow-hidden shadow-md bg-white group transition transform hover:scale-[1.01] ${
        !isOnline ? 'grayscale pointer-events-none' : ''
      }`}
    >
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
        <button className="bg-onRed text-white px-2 py-1 md:px-5 md:py-2 text-xs rounded-tl-xl rounded-br-xl flex items-center gap-1 hover:bg-green-600 transition">
          <MdOutlineShoppingBag className="text-base" />
          {isArabic ? "أضف" : "Add"}
        </button>
      </div>
    </div>
  );
};

export default React.memo(FoodCardInVendor);
