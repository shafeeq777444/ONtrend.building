import React from "react";
import { Star, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { handleOpenInGoogleMaps } from "@/shared/utils/handleOpenInGoogleMaps";

export default function BuildingDetailsCard({ building }) {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  // Fallback values
  const fallbackData = {
    name_ar: "فندق فاخر",
    name_en: "Luxury Hotel",
    description_ar: "فندق فاخر مع إطلالات رائعة وخدمة ممتازة",
    description_en: "Luxury hotel with amazing views and excellent service",
    star_rating: 4.5,
    starting_amount: 100,
    latitude: 23.5880,
    longitude: 58.3829,
    city: "Muscat",
    state: "Muscat",
    country: "Oman",
    address_line1: "123 Main Street",
    address_line2: "Downtown Area"
  };

  const fallbackImg = "https://plus.unsplash.com/premium_photo-1676823547752-1d24e8597047?fm=jpg&q=60&w=3000";
  const imageSrc = building?.building_media?.[0]?.images?.[0] || fallbackImg;

  const buildingName = isArabic ? (building?.name_ar || fallbackData.name_ar) : (building?.name_en || fallbackData.name_en);
  const buildingDescription = isArabic ? (building?.description_ar || fallbackData.description_ar) : (building?.description_en || fallbackData.description_en);
  const locationLine = `${building?.address_line1 || fallbackData.address_line1} ${building?.address_line2 || fallbackData.address_line2}, ${building?.city || fallbackData.city}, ${building?.state || fallbackData.state}, ${building?.country || fallbackData.country}`;

  return (
    <div className="bg-white rounded-3xl shadow-xl p-4 max-w-sm w-full mx-auto">
      {/* Image */}
      <img
        src={imageSrc}
        alt={buildingName}
        className="w-full h-40 object-cover rounded-2xl mb-3"
        onError={e => { if (e.target.src !== fallbackImg) e.target.src = fallbackImg; }}
      />
      {/* Title */}
      <div className="mb-3">
        <h2 className="text-xl font-bold text-gray-900">{buildingName}</h2>
        <p className="text-sm text-gray-600">{locationLine}</p>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 mb-4 leading-relaxed">
        {buildingDescription}
      </p>

      {/* Info Row */}
      <div className="flex items-center justify-between mb-4">
        {/* Rating */}
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
          <span className="text-sm font-semibold text-gray-800">{building?.star_rating || fallbackData.star_rating}</span> 
        </div>

        {/* Price */}
        <div className="text-sm text-gray-700">
          <span className="font-semibold">{isArabic ? "يبدأ من" : "Starts from"} {building?.starting_amount || fallbackData.starting_amount} OMR</span>
        </div>
      </div>

      {/* Navigate Button */}
      <button
        onClick={() => handleOpenInGoogleMaps(building?.latitude || fallbackData.latitude, building?.longitude || fallbackData.longitude)}
        className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <MapPin className="w-4 h-4" />
        {isArabic ? "التنقل عبر الخريطة" : "Open in Maps"}
      </button>
    </div>
  );
}
