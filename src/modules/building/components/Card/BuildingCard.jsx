import { FaHeart, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import FavoriteButton from "@/shared/components/common/FavouriteButton";
import {  useNavigate } from "react-router-dom";
import LazyImg from "@/shared/components/LazyImg";

const BuildingCard = ({ building,isLiked }) => {
  const { i18n } = useTranslation();
  const navigate=useNavigate()
  const isArabic = i18n.language === "ar";

  const displayName = isArabic ? building?.name_ar : building?.name_en;
  console.log(building,"building card")

  return (
    <div onClick={()=>{
      navigate(`/building/${building?.id}`)
    }} className="bg-white rounded-2xl shadow-md overflow-hidden min-w-[200px]  relative transform transition-transform duration-300 hover:scale-[1.01]">
      {/* Image & Heart */}
      <div className="relative">
        <LazyImg
          src={building?.building_media[0]?.images[0]}
          alt="property"
          className="w-full h-56 object-cover rounded-t-2xl"
        />
        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md">
          <FaHeart className="" />
        </button>

        {/* favourite */}
        <FavoriteButton product={building} isLiked={isLiked} unlikeIconColor="text-gray-600"/>

        {/* Rating Badge */}
        <div className="absolute bottom-[-15px] right-3 bg-white rounded-full px-3 py-1 shadow-md flex items-center text-sm font-medium text-yellow-500">
          <FaStar className="mr-1" /> {building?.star_rating ?? 0}
        </div>
      </div>

      <div className="p-4 pt-6 space-y-2">
        <h3 className="text-base font-semibold text-gray-800 leading-tight">
          {displayName}
        </h3>

        <div className="flex items-center text-xs text-gray-500">
          <FaMapMarkerAlt className="mr-1 text-sm" />
          {building?.city}, {building?.state}, {building?.country}
        </div>

        <div className="flex justify-between items-center pt-2">
          <div></div>
          <span className="text-gray-800 font-semibold">
            OMR {building?.starting_amount.toFixed(3)}
            {/* <span className="text-sm font-normal text-gray-600">/week</span> */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BuildingCard;
