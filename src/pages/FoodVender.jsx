import React from "react";
import { useParams } from "react-router-dom";
import FoodVendorHeader from "../components/FoodVendor/FoodVendorHeader";
import FoodVendorDetails from "../components/FoodVendor/FoodVendorDetails";
import FoodOrderComputerOrder from "../components/FoodVendor/FoodOrderComputerOrder";
import FoodVendorMealCategory from "../components/FoodVendor/FoodVendorMealCategory";
import FoodVendorProducts from "@/containers/FoodVendor/FoodVendorProducts";
import { useGetAllFoodVendors } from "@/hooks/queries/useVendors";
import { useSelector } from "react-redux";
import { useGetVendorFoodsAndCategories } from "@/hooks/queries/useFoodVendor";

const FoodVender = () => {
    const { vendorId } = useParams();
    const {
        location: { lat, lng },
    } = useSelector((state) => state.user);
    const { selectedVendorMealCategory, searchTerm, sortOption } = useSelector((state) => state.food);

    const { data: allFoodVendors } = useGetAllFoodVendors(lat, lng);
    const currentVendor = allFoodVendors?.find((vendor) => vendor.id === vendorId);
    const { data } = useGetVendorFoodsAndCategories(currentVendor?.id);

    // Get all foods
    let categoryWiseFoods = data?.foods || [];

    // Filter by category
    if (selectedVendorMealCategory && selectedVendorMealCategory !== "All") {
        categoryWiseFoods = categoryWiseFoods.filter((food) => food?.category === selectedVendorMealCategory);
    }

    // Filter by search
    if (searchTerm?.trim()) {
        const lowerSearch = searchTerm.toLowerCase();
        categoryWiseFoods = categoryWiseFoods.filter(
            (food) =>
                food?.name?.toLowerCase().includes(lowerSearch) ||
                food?.description?.toLowerCase().includes(lowerSearch) ||
                food?.category?.toLowerCase().includes(lowerSearch)
        );
    }

    // Sort
    if (sortOption === "lowToHigh") {
        categoryWiseFoods = categoryWiseFoods.slice().sort((a, b) => (a?.itemPrice ?? 0) - (b?.itemPrice ?? 0));
    } else if (sortOption === "highToLow") {
        categoryWiseFoods = categoryWiseFoods.slice().sort((a, b) => (b?.itemPrice ?? 0) - (a?.itemPrice ?? 0));
    } else {
        categoryWiseFoods = categoryWiseFoods.slice().sort(() => Math.random() - 0.5);
    }

    return (
        <div className="flex flex-col lg:flex-row gap-6  px-4 lg:px-10 mt-24">
            {/* Left side (Main Content) */}
            <div className="w-full lg:w-[calc(100%-360px)] space-y-6">
                <FoodVendorHeader currentVendor={currentVendor} />
                <div className="bg-white rounded-lg shadow-sm p-4">
                    {/* <FoodVendorDetails currentVendor={currentVendor} /> */}
                    <FoodVendorMealCategory categories={data?.categories} selectedCategory={selectedVendorMealCategory} />
                    <FoodVendorProducts venderLogo={currentVendor?.image} foodItems={categoryWiseFoods} />
                </div>
            </div>

            {/* Right side (Order Summary - only on large screens) */}
            <div className="hidden lg:block w-full lg:w-[340px]">
  <div className="fixed top-20 right-6">
    <FoodOrderComputerOrder />
  </div>
</div>

        </div>
    );
};

export default FoodVender;
