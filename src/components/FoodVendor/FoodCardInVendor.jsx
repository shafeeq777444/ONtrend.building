import React, { useState } from 'react';
import { FaHeart } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { DrawerTrigger,} from "@/components/ui/drawer"
import FoodVendorDrawer from './FoodVendorDrawer';



const FoodCardInVendor = ({ item, venderLogo, onClick}) => {
  
  const [isImageError, setIsImageError] = useState(false);


  const description = item.description ||
    `A delicious ${item.category?.toLowerCase() || "dish"} prepared with care at ${item.restaurantName || "our restaurant"}.`;

  const shortDesc =
    description.length > 30 ? description.slice(0, 30) + '... more' : description;

  return (<>
   
     {/* <DrawerTrigger> */}
  <div onClick={onClick} className="relative cursor-pointer rounded-xl overflow-hidden shadow-md bg-white group transition transform hover:scale-[1.01]">
    
    {/* Image */}
    <div className="relative">
      <img
        src={isImageError ? venderLogo : item.imageUrl}
        alt={item.name}
        loading="lazy"
        className={`w-full h-40 sm:h-48 ${isImageError ? "object-contain p-4" : "object-cover"}`}
        onError={() => setIsImageError(true)}
      />

      {/* Gradient + Local Name */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-2 group-hover:opacity-0 transition-opacity duration-300">
        <p className="text-white text-end text-xs sm:text-sm font-semibold">
          {item?.localName}
        </p>
        <p className="text-white text-end text-xs sm:text-sm font-semibold">
          {item?.localTag}
        </p>
      </div>

      {/* Heart Icon */}
      <div className="absolute top-2 left-2 z-10">
        <button className="bg-white/30 p-2 rounded-full shadow-md hover:bg-white/80 transition">
          <FaHeart className="text-red-500 text-sm" />
        </button>
      </div>
    </div>

    {/* Card Content */}
    <div className="p-2 pb-14">
      <h3 className="text-sm font-semibold truncate">{item.name}</h3>
      <p className="text-xs text-gray-500 mt-1 truncate">{shortDesc}</p>
    </div>

    {/* Price */}
    <div className="absolute bottom-0 left-0 p-2">
      <span className="text-sm font-bold text-gray-800">OMR {item.itemPrice}</span>
    </div>


    {/* Add Button */}
    <div className="absolute bottom-0 right-0">
      <button  className="bg-onRed text-white px-2 py-1 md:px-5 md:py-2 text-xs rounded-tl-xl rounded-br-xl flex items-center gap-1 hover:bg-green-600 transition">
        <MdOutlineShoppingBag className="text-base" />
        Add
      </button>
    </div>
  </div>
{/* </DrawerTrigger> */}

   </>
  );
};

export default FoodCardInVendor;
