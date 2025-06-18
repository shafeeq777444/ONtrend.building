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
   
      <DrawerTrigger>
    <div onClick={onClick} className="relative cursor-pointer rounded-lg overflow-hidden shadow-lg bg-white group">
      
      {/* Food Image */}
      <div  className="relative">
        <img
          src={isImageError ? venderLogo : item.imageUrl}
          alt={item.name}
          loading="lazy"
          className={`w-full h-52 ${isImageError ? "object-contain p-4" : "object-cover"}`}
          onError={() => setIsImageError(true)}
        />

        {/* Black overlay on hover */}
        {/* <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" /> */}

        {/* Vendor Logo top-left */}
        <div className="absolute top-2 left-2 z-10 w-10 h-10  rounded-full overflow-hidden shadow">
          {/* <img
            src={venderLogo}
            alt="Vendor Logo"
            className="object-cover w-full h-full"
          /> */}
          <button className="bg-white/30 p-2 rounded-full shadow-md hover:bg-gray-100 transition">
            <FaHeart className="text-red-500 text-lg" />
          </button>
        </div>

        {/* Gradient & lowerCaseName at bottom (hide on hover) */}
        <div className="absolute bottom-0 left-0 right-0 z-10 group-hover:opacity-0 transition-opacity duration-300">
          <div className="bg-gradient-to-t from-black/90 to-transparent px-3 py-3

           ">
            <p className="text-white text-end text-sm font-semibold">
              {item?.localName}
            </p>
            <p className="text-white text-end text-sm font-semibold">
              {item?.localTag}
            </p>
          </div>
        </div>

        {/* Wishlist Icon */}
        <div className="absolute top-2 right-2 z-10">
          
        </div>
      </div>

      {/* Content */}
      <div className="p-3 pb-14">
        <h3 className="text-lg font-semibold truncate">{item.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{shortDesc}</p>
      </div>

      {/* Price bottom-left */}
      <div className="absolute bottom-0 left-0 p-3">
        <span className="text-lg font-bold text-gray-800">OMR {item.itemPrice}</span>
      </div>

      {/* Order button bottom-right */}
      <div className="absolute bottom-0 right-0">
        <button className="cursor-pointer bg-onRed text-white px-4 py-2 rounded-tl-xl rounded-br-xl w-30 flex justify-center items-center gap-1 hover:bg-green-600 transition">
          <MdOutlineShoppingBag className="text-lg" />
          Add
        </button>
      </div>
    </div>
      </DrawerTrigger>
   </>
  );
};

export default FoodCardInVendor;
