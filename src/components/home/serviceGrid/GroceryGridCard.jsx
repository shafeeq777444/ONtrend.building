import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const GroceryGridCard = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <div className="relative group w-full h-full cursor-pointer overflow-hidden rounded-lg shadow-md">
      {/* Image */}
      <img
        className="w-full h-full object-cover"
        src="/gird/grocery2.jpg"
        alt="Grocery"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-opacity-50 transition duration-300" />

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4 space-y-4">
        <div>
          <h3 className="text-2xl font-semibold mb-2">
            {isArabic ? 'بقالة طازجة' : 'Fresh Groceries'}
          </h3>
          <p className="opacity-0 group-hover:opacity-100 text-sm transition duration-700 delay-100">
            {isArabic
              ? 'احصل على أجود أنواع البقالة إلى باب منزلك!'
              : 'Get the best quality groceries delivered to your doorstep!'}
          </p>
        </div>
      </div>

      {/* Expandable Arrow Button */}
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
  );
};

export default GroceryGridCard;
