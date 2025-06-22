import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import FoodVendorHeader from "../components/FoodVendor/FoodVendorHeader";
import FoodVendorMealCategory from "../components/FoodVendor/FoodVendorMealCategory";
import FoodOrderComputerOrder from "../components/FoodVendor/FoodOrderComputerOrder";
import FoodVendorProducts from "@/containers/FoodVendor/FoodVendorProducts";
import { useGetAllFoodVendors } from "@/hooks/queries/useVendors";
import { useGetVendorFoodsAndCategories, useVendorFoodCategories } from "@/hooks/queries/useFoodVendor";
import { useTranslation } from "react-i18next";

const getLocalizedField = (item, field, isArabic) => {
  return isArabic ? item?.[`${field}Arabic`] || item?.[field] : item?.[field];
};

const FoodVender = () => {
  const { vendorId } = useParams();
  const {
    location: { lat, lng },
  } = useSelector((state) => state.user);
  const {
    selectedVendorMealCategory,
    searchTerm,
    sortOption,
  } = useSelector((state) => state.food);

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

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:px-10 mt-24" dir={isArabic ? "rtl" : "ltr"}>
      {/* Left Section */}
      <div className="w-full md:[80vw] lg:w-[calc(100%-360px)] space-y-6">
        <FoodVendorHeader currentVendor={currentVendor} />

        {/* Products Area */}
        <div ref={productsRef} className="bg-white rounded-lg shadow-sm p-4">
          <FoodVendorMealCategory
            categories={vendorCategories}
            selectedCategory={selectedVendorMealCategory}
          />

          <FoodVendorProducts
            venderLogo={currentVendor?.image}
            foodItems={filteredFoods}
            isArabic={isArabic}
          />

          {/* Pagination Buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 disabled:opacity-40 transition"
              onClick={handlePrevious}
              disabled={currentPageIndex === 0}
            >
              ← Previous
            </button>

            <span className="text-sm font-medium text-gray-600">
              Page {currentPageIndex + 1}
            </span>

            <button
              className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 disabled:opacity-40 transition"
              onClick={handleNext}
              disabled={
                (!hasNextPage && currentPageIndex === data?.pages.length - 1) ||
                isFetchingNextPage
              }
            >
              {isFetchingNextPage ? "Loading..." : "Next →"}
            </button>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden lg:block w-full lg:w-[340px]">
  <div className={`fixed top-20 ${isArabic ? "left-2" : "right-2"}`}>
    <FoodOrderComputerOrder />
  </div>
</div>
    </div>
  );
};

export default FoodVender;