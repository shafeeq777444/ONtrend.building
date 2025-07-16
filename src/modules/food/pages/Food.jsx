import OntrendLoading from "@/shared/components/common/OntrendLoading";
import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import FoodSearchVendors from "../components/foodHome/FoodSearchVendors";
import FoodOffers from "../containers/food-home/FoodOffers";
import CategoryBar from "../components/foodHome/CategoryBar";
import FoodDiscountDeals from "@/containers/FoodHome/FoodDiscountDeals";
import SkeltonRestuarent from "@/modules/food/components/skeltons/SkeltonRestuarent";
import TopRated from "@/containers/FoodHome/TopRated";
const NearByFood = lazy(() => import("../../../shared/containers/FoodHome/Category/NearByFoodVendors"));
const NewVendors = lazy(() => import("../../../shared/containers/FoodHome/Category/NewVendors"));
const TopPicks = lazy(() => import("@/modules/food/containers/food-home/TopPicks.jsx"));

const RenderCategorySection = () => {
    const categoryBar = useSelector((state) => state.food.categoryBar);
    console.log(categoryBar);
    switch (categoryBar) {
        case "Nearby":
            return <NearByFood />;
        case "New OnTrend":
            return <NewVendors />;
        case "Best Sellers":
            return <TopPicks />;
        default:
            return (
                <>
                    <NearByFood />
                </>
            );
    }
};

const Food = () => {
    return (
        <div className="">
            <FoodSearchVendors />
            {/* <FoodHomeHIgliteCarousel/> */}
            <FoodOffers />
            <TopRated />
            <CategoryBar />
            <Suspense fallback={<SkeltonRestuarent heading={false} />}>
                <RenderCategorySection />
            </Suspense>
            <FoodDiscountDeals />
        </div>
    );
};

export default Food;
