import { ArrowUpRight } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next"; // ✅ Add this

const GridCard = ({ title, description, image }) => {
    const { i18n } = useTranslation(); // ✅ Add this
    const isArabic = i18n.language === "ar"; // ✅ Detect Arabic

    return (
        <div className="relative group w-full h-full cursor-pointer overflow-hidden rounded-lg shadow-md">
            {/* Image */}
            <img className="w-full h-full object-cover" src={image} alt={title} />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/20 bg-opacity-30 group-hover:bg-opacity-50 transition duration-300" />

            <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
                {/* Title fades out on hover */}
                <h3
                    className="text-2xl font-semibold mb-2 absolute transition-all duration-700 ease-in-out 
               opacity-100 translate-y-0 group-hover:opacity-0 group-hover:-translate-y-2"
                >
                    {title}
                </h3>

                {/* Description fades in on hover */}
                <p
                    className="text-sm absolute opacity-0 translate-y-2 transition-all duration-700 ease-in-out 
               group-hover:opacity-100 group-hover:translate-y-0 delay-100 px-2"
                >
                    {description}
                </p>

                {/* Arrow Button */}
                <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                       <div className="bg-white text-black rounded-full p-2 w-[38px] flex items-center overflow-hidden group/arrow hover:bg-black hover:text-white transition-all duration-500 ease-in-out hover:w-28">
                         {/* Text appears only on arrow hover */}
                        <span
                 className={`text-sm whitespace-nowrap opacity-0 max-w-0 group-hover/arrow:max-w-[100px] group-hover/arrow:opacity-100 transition-all duration-500 ease-in-out ${
                   isArabic ? "ml-2 hover:ml-6" : "mr-2"
                 }`}
               >
                 {isArabic ? "اطلب الآن" : "Order Now"}
               </span>
               
                         {/* Rotating icon, flipped in Arabic */}
                         <ArrowUpRight
                           size={20}
                           className={`transition-transform duration-300 relative  ease-in-out group-hover/arrow:rotate-45 ${
                             isArabic ? 'left-1 scale-x-[-1]' : 'right-1'
                           }`}
                         />
                       </div>
                     </div>
            </div>
        </div>
    );
};

export default GridCard;
