import OntrendLoading from "@/shared/components/common/OntrendLoading";
import React, { Suspense, lazy, useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import FoodSearchVendors from "../components/foodHome/FoodSearchVendors";
import FoodOffers from "../containers/food-home/FoodOffers";
import CategoryBar from "../components/foodHome/CategoryBar";
import FoodDiscountDeals from "@/containers/FoodHome/FoodDiscountDeals";
import SkeltonRestuarent from "@/modules/food/components/skeltons/SkeltonRestuarent";
import TopRated from "@/containers/FoodHome/TopRated";
import LazyRenderOnView from "@/shared/components/performanceOptimised/LazyRenderOnView";
const NearByFood = lazy(() => import("../../../shared/containers/FoodHome/Category/NearByFoodVendors"));
const NewVendors = lazy(() => import("../../../shared/containers/FoodHome/Category/NewVendors"));
const TopPicks = lazy(() => import("@/modules/food/containers/food-home/TopPicks.jsx"));

const RenderCategorySection = () => {
    const categoryBar = useSelector((state) => state.food.categoryBar);
    console.log(categoryBar);
    switch (categoryBar) {
        case "Nearby":
            return (
                <LazyRenderOnView>
                    <NearByFood />
                </LazyRenderOnView>
            );
        case "New OnTrend":
            return (
                <LazyRenderOnView>
                    <NewVendors />
                </LazyRenderOnView>
            );
        case "Best Sellers":
            return (
                <LazyRenderOnView>
                    <TopPicks />
                </LazyRenderOnView>
            );
        default:
            return (
                <>
                    <LazyRenderOnView>
                        <NearByFood />
                    </LazyRenderOnView>
                </>
            );
    }
};

const Food = () => {
    // Smooth scroll to top when food page opens
    useLayoutEffect(() => {
        // Immediate scroll for fast response
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);
    
    useEffect(() => {
        // Delayed smooth scroll to handle navigation scenarios
        const scrollToTop = () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        };
        
        // Multiple timing attempts to ensure it works
        scrollToTop();
        const timer1 = setTimeout(scrollToTop, 50);
        const timer2 = setTimeout(scrollToTop, 200);
        
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    return (
        <div className="">
            <FoodSearchVendors />     {/* ✅ */} 
            {/* <FoodHomeHIgliteCarousel/> */}
        
            <FoodOffers /> {/* ✅ */}
            <TopRated />    

            <LazyRenderOnView>
                <CategoryBar />
            </LazyRenderOnView>
            <Suspense fallback={<SkeltonRestuarent heading={false} />}>
                <RenderCategorySection />
            </Suspense>
            <LazyRenderOnView>
                <FoodDiscountDeals />
            </LazyRenderOnView>
        </div>
    );
};

export default Food;
