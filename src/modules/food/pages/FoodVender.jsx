import React, { useMemo, useRef, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import FoodVendorMealCategory from "../components/FoodVendor/FoodVendorMealCategory";
import FoodVendorProducts from "@/modules/food/containers/FoodVendor/FoodVendorProducts";
import FoodVendorHeader from "../components/FoodVendor/FoodVendorHeader";
import PaginationButtons from "@/shared/components/common/PaginationButtons";

import { useGetAllFoodVendors } from "@/shared/services/queries/vendors.query";
import {
  useGetVendorFoodsAndCategories,
  useVendorFoodCategories,
} from "@/shared/services/queries/foodVendor.query";

import { useTranslation } from "react-i18next";

const getLocalizedField = (item, field, isArabic) =>
  isArabic ? item?.[`${field}Arabic`] || item?.[field] : item?.[field];

const FoodVendor = () => {
  const { vendorId } = useParams();
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const {
    location: { lat, lng },
  } = useSelector((state) => state.user);
  const { selectedVendorMealCategory, searchTerm, sortOption } = useSelector((state) => state.food);

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const productsRef = useRef(null);

  const { data: allVendors, isLoading: isVendorsLoading } = useGetAllFoodVendors(lat, lng);
  const currentVendor = useMemo(() => allVendors?.find((v) => v.id === vendorId), [allVendors, vendorId]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isFoodsLoading,
  } = useGetVendorFoodsAndCategories(currentVendor?.id, selectedVendorMealCategory);

  const { data: vendorCategories, isLoading: isCategoryLoading } = useVendorFoodCategories(currentVendor?.id);

  const scrollToProducts = () =>
    productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handleNext = useCallback(() => {
    if (currentPageIndex + 1 < (data?.pages.length || 0)) {
      setCurrentPageIndex((prev) => prev + 1);
      scrollToProducts();
    } else if (hasNextPage) {
      fetchNextPage().then(() => {
        setCurrentPageIndex((prev) => prev + 1);
        scrollToProducts();
      });
    }
  }, [currentPageIndex, data?.pages.length, hasNextPage, fetchNextPage]);

  const handlePrevious = useCallback(() => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
      scrollToProducts();
    }
  }, [currentPageIndex]);

  const isNextDisabled =
    (!hasNextPage && currentPageIndex === (data?.pages.length || 0) - 1) || isFetchingNextPage;

  const filteredFoods = useMemo(() => {
    const currentFoods = data?.pages?.[currentPageIndex]?.foods || [];
    let result = [...currentFoods];

    if (selectedVendorMealCategory && selectedVendorMealCategory !== "All") {
      result = result.filter((food) => food?.category === selectedVendorMealCategory);
    }

    if (searchTerm?.trim()) {
      const lower = searchTerm.toLowerCase();
      result = result.filter((food) =>
        ["name", "description", "category"].some((field) =>
          getLocalizedField(food, field, isArabic)?.toLowerCase().includes(lower)
        )
      );
    }

    if (sortOption === "lowToHigh") {
      result.sort((a, b) => (a.itemPrice ?? 0) - (b.itemPrice ?? 0));
    } else if (sortOption === "highToLow") {
      result.sort((a, b) => (b.itemPrice ?? 0) - (a.itemPrice ?? 0));
    }

    return result;
  }, [data?.pages, currentPageIndex, selectedVendorMealCategory, searchTerm, sortOption, isArabic]);

  const limitedFoods = useMemo(() => filteredFoods.slice(0, 12), [filteredFoods]);

  const isHeaderLoading = isCategoryLoading || isVendorsLoading;
  const isProductsLoading = isFoodsLoading || isVendorsLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br" dir={isArabic ? "rtl" : "ltr"}>
      <FoodVendorHeader isLoading={isHeaderLoading} currentVendor={currentVendor} />

      <div className="overflow-y-hidden bg-white rounded-t-2xl z-30 -mt-4 scrollbar-hide">
        <div ref={productsRef} className="bg-white shadow-xl p-4">
          <FoodVendorMealCategory
            setCurrentPageIndex={setCurrentPageIndex}
            isOnline={currentVendor?.isOnline}
            isLoading={isHeaderLoading}
            categories={vendorCategories}
            selectedCategory={selectedVendorMealCategory}
          />

          <FoodVendorProducts
            isLoading={isProductsLoading}
            isOnline={currentVendor?.isOnline}
            foodItems={limitedFoods}
            isArabic={isArabic}
            venderLogo={currentVendor?.image}
          />

          {!isProductsLoading && (
            <PaginationButtons
              isOnline={currentVendor?.isOnline}
              currentPageIndex={currentPageIndex}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
              isArabic={isArabic}
              isFetchingNextPage={isFetchingNextPage}
              isNextDisabled={isNextDisabled}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodVendor;
