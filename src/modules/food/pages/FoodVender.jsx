import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import FoodVendorMealCategory from "../components/FoodVendor/FoodVendorMealCategory";

import FoodVendorProducts from "@/modules/food/containers/FoodVendor/FoodVendorProducts";

import { useGetAllFoodVendors } from "@/shared/services/queries/vendors.query";
import { useGetVendorFoodsAndCategories, useVendorFoodCategories } from "@/shared/services/queries/foodVendor.query";

import { useTranslation } from "react-i18next";
import PaginationButtons from "@/shared/components/common/PaginationButtons";
import FoodVendorHeader from "../components/FoodVendor/FoodVendorHeader";

const getLocalizedField = (item, field, isArabic) => {
    return isArabic ? item?.[`${field}Arabic`] || item?.[field] : item?.[field];
};

const FoodVendor = () => {
    const { vendorId } = useParams();
    const {
        location: { lat, lng },
    } = useSelector((state) => state.user);
    const { selectedVendorMealCategory, searchTerm, sortOption } = useSelector((state) => state.food);

    const { i18n } = useTranslation();
    const isArabic = i18n.language === "ar";

    const { data: allFoodVendors, isLoading: getVendorLoading } = useGetAllFoodVendors(lat, lng);
    const currentVendor = allFoodVendors?.find((vendor) => vendor.id === vendorId);
    console.log(currentVendor, "busy checl");

    const [currentPageIndex, setCurrentPageIndex] = useState(0);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: allProductsLoading,
    } = useGetVendorFoodsAndCategories(currentVendor?.id, selectedVendorMealCategory);

    const { data: vendorCategories, isLoading: vendorCategoryLoading } = useVendorFoodCategories(currentVendor?.id);

    const productsRef = useRef(null);

    const scrollToProducts = () => {
        productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const getFilteredFoods = () => {
        const currentPageFoods = data?.pages?.[currentPageIndex]?.foods || [];
        let filteredFoods = currentPageFoods;

        if (selectedVendorMealCategory && selectedVendorMealCategory !== "All") {
            filteredFoods = filteredFoods.filter((food) => food?.category === selectedVendorMealCategory);
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

    const isNextDisabled = (!hasNextPage && currentPageIndex === (data?.pages.length || 0) - 1) || isFetchingNextPage;

    const filteredFoods = getFilteredFoods();

    return (
        <div className="mt-14    min-h-screen bg-gradient-to-br" dir={isArabic ? "rtl" : "ltr"}>
            {/* Header */}
            <FoodVendorHeader isLoading={vendorCategoryLoading || getVendorLoading} currentVendor={currentVendor} />

            {/* Scrollable Content */}
            <div className="overflow-y-hidden bg-white rounded-t-2xl z-30  -mt-4 scrollbar-hide ">
                <div ref={productsRef} className="bg-white backdrop-blur-sm  shadow-xl p-4">
                    {/* Categories */}
                    <FoodVendorMealCategory
                        setCurrentPageIndex={setCurrentPageIndex}
                        isOnline={currentVendor?.isOnline}
                        isLoading={vendorCategoryLoading || getVendorLoading}
                        categories={vendorCategories}
                        selectedCategory={selectedVendorMealCategory}
                    />

                    {/* Products */}
                    <FoodVendorProducts
                        isLoading={allProductsLoading || getVendorLoading}
                        isOnline={currentVendor?.isOnline}
                        foodItems={filteredFoods}
                        isArabic={isArabic}
                        venderLogo={currentVendor?.image}
                    />

                    {/* Pagination */}
                    <PaginationButtons
                        isOnline={currentVendor?.isOnline}
                        currentPageIndex={currentPageIndex}
                        handleNext={handleNext}
                        handlePrevious={handlePrevious}
                        isArabic={isArabic}
                        isFetchingNextPage={isFetchingNextPage}
                        isNextDisabled={isNextDisabled}
                    />
                </div>
            </div>
        </div>
    );
};

export default FoodVendor;
