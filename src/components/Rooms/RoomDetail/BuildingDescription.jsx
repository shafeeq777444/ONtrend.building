import React from 'react';
import { useTranslation } from 'react-i18next';

const BuildingDescription = ({ description_ar, description_en }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <div
      className={`m-4 p-4  rounded-xl text-gray-800 text-sm leading-relaxed ${
        isArabic ? 'text-right' : 'text-left'
      }`}
    >
      <p>{isArabic ? description_ar : description_en}</p>
    </div>
  );
};

export default BuildingDescription;
