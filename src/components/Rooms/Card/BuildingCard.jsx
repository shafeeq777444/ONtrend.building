import { FaHeart, FaStar, FaMapMarkerAlt } from "react-icons/fa";



const BuildingCard = ({ name, city, country, price, rating, imageUrl }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden w-[300px] relative">
      {/* Image & Heart */}
      <div className="relative">
        <img
          src={imageUrl}
          alt="property"
          className="w-full h-56 object-cover rounded-t-2xl"
        />

        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md">
          <FaHeart className="text-gray-600" />
        </button>

        {/* Rating Badge */}
        <div className="absolute bottom-[-15px] right-3 bg-white rounded-full px-3 py-1 shadow-md flex items-center text-sm font-medium text-yellow-500">
          <FaStar className="mr-1" /> {rating ?? 0}
        </div>
      </div>

      <div className="p-4 pt-6 space-y-2">
        <h3 className="text-base font-semibold text-gray-800 leading-tight">
          {name}
        </h3>

        <div className="flex items-center text-xs text-gray-500">
          <FaMapMarkerAlt className="mr-1 text-sm" />
          {city}, {country}
        </div>

        <div className="flex justify-between items-center pt-2">
          <div></div>
          <span className="text-gray-800 font-semibold">
            ${price ?? 0}{" "}
            <span className="text-sm font-normal text-gray-600">/week</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BuildingCard;
