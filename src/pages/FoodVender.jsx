import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import FoodVendorMealCategory from "../components/FoodVendor/FoodVendorMealCategory";
import FoodVendorHeader from "@/components/FoodVendor/FoodVendorHeader";
import FoodVendorProducts from "@/containers/FoodVendor/FoodVendorProducts";

import { useGetAllFoodVendors } from "@/hooks/queries/useVendors";
import {
  useGetVendorFoodsAndCategories,
  useVendorFoodCategories,
} from "@/hooks/queries/useFoodVendor";

import { useTranslation } from "react-i18next";

const getLocalizedField = (item, field, isArabic) => {
  return isArabic ? item?.[`${field}Arabic`] || item?.[field] : item?.[field];
};

const FoodVendor = () => {
  const { vendorId } = useParams();
  const {
    location: { lat, lng },
  } = useSelector((state) => state.user);
  const { selectedVendorMealCategory, searchTerm, sortOption } = useSelector(
    (state) => state.food
  );

  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const { data: allFoodVendors } = useGetAllFoodVendors(lat, lng);
  const currentVendor = allFoodVendors?.find((vendor) => vendor.id === vendorId);

  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetVendorFoodsAndCategories(currentVendor?.id, selectedVendorMealCategory);

  const { data: vendorCategories } = useVendorFoodCategories(currentVendor?.id);

  const productsRef = useRef(null);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const getFilteredFoods = () => {
    const currentPageFoods = data?.pages?.[currentPageIndex]?.foods || [];
    let filteredFoods = currentPageFoods;

    if (selectedVendorMealCategory && selectedVendorMealCategory !== "All") {
      filteredFoods = filteredFoods.filter(
        (food) => food?.category === selectedVendorMealCategory
      );
    }

    if (searchTerm?.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      filteredFoods = filteredFoods.filter(
        (food) =>
          getLocalizedField(food, "name", isArabic)?.toLowerCase().includes(lowerSearch) ||
          getLocalizedField(food, "description", isArabic)?.toLowerCase().includes(lowerSearch) ||
          getLocalizedField(food, "category", isArabic)?.toLowerCase().includes(lowerSearch)
      );
    }

    if (sortOption === "lowToHigh") {
      filteredFoods = filteredFoods.slice().sort((a, b) => (a?.itemPrice ?? 0) - (b?.itemPrice ?? 0));
    } else if (sortOption === "highToLow") {
      filteredFoods = filteredFoods.slice().sort((a, b) => (b?.itemPrice ?? 0) - (a?.itemPrice ?? 0));
    }

    return filteredFoods;
  };

  const handleNext = () => {
    if (currentPageIndex + 1 < (data?.pages.length || 0)) {
      setCurrentPageIndex((prev) => prev + 1);
      scrollToProducts();
    } else if (hasNextPage) {
      fetchNextPage().then(() => {
        setCurrentPageIndex((prev) => prev + 1);
        scrollToProducts();
      });
    }
  };

  const handlePrevious = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
      scrollToProducts();
    }
  };

  const isNextDisabled =
    (!hasNextPage && currentPageIndex === (data?.pages.length || 0) - 1) || isFetchingNextPage;

  const filteredFoods = getFilteredFoods();

  return (
    <div className="mt-14    min-h-screen bg-gradient-to-br" dir={isArabic ? "rtl" : "ltr"}>
      {/* Header */}
        <FoodVendorHeader currentVendor={currentVendor} />


      {/* Scrollable Content */}
      <div className="overflow-y-hidden bg-white rounded-t-2xl z-30 mt-70 scrollbar-hide ">
        <div ref={productsRef} className="bg-white backdrop-blur-sm  shadow-xl p-4">
          {/* Categories */}
          <FoodVendorMealCategory
            categories={vendorCategories}
            selectedCategory={selectedVendorMealCategory}
          />

          {/* Products */}
          <FoodVendorProducts
            venderLogo={currentVendor?.image}
            foodItems={filteredFoods}
            isArabic={isArabic}
          />

          {/* Pagination */}
         <div className="flex justify-center items-center gap-6 mt-12 mb-6">
  <button
    className="px-5 py-2 border text-sm font-medium rounded-xl text-[#ff3131] border-[#ff3131] bg-white hover:bg-[#ff3131] hover:text-white transition"
    onClick={handlePrevious}
    disabled={currentPageIndex === 0}
    aria-label={isArabic ? "الصفحة السابقة" : "Previous page"}
  >
    {isArabic ? "التالي ←" : "← Previous"}
  </button>

  <span className="text-sm font-semibold text-gray-600 bg-white px-4 py-2 rounded-full border border-gray-200">
    {isArabic ? `صفحة ${currentPageIndex + 1}` : `Page ${currentPageIndex + 1}`}
  </span>

  <button
    className="px-5 py-2 border text-sm font-medium rounded-xl text-[#ff3131] border-[#ff3131] bg-white hover:bg-[#ff3131] hover:text-white transition flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
    onClick={handleNext}
    disabled={isNextDisabled}
    aria-label={isArabic ? "الصفحة التالية" : "Next page"}
  >
    {isFetchingNextPage ? (
      <>
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        {isArabic ? "جاري التحميل..." : "Loading..."}
      </>
    ) : isArabic ? (
      "→ السابق"
    ) : (
      "Next →"
    )}
  </button>
</div>

        </div>
      </div>
    </div>
  );
};

export default FoodVendor;
