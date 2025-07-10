
import OntrendLoading from "@/shared/components/common/OntrendLoading";
import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
const CategoryBar = lazy(() => import("../components/foodHome/CategoryBar"));
const FoodDiscountDeals = lazy(() => import("../../../shared/containers/FoodHome/FoodDiscountDeals"));
const FoodOffers = lazy(() => import("../containers/FoodHome/FoodOffers"));
const TopRated = lazy(() => import("../../../shared/containers/FoodHome/TopRated"));
const NearByFood = lazy(() => import("../../../shared/containers/FoodHome/Category/NearByFoodVendors"));
const NewVendors = lazy(() => import("../../../shared/containers/FoodHome/Category/NewVendors"));
const TopPicks = lazy(() => import("../../../shared/containers/FoodHome/Category/TopPicks"));
const FoodSearchVendors = lazy(() => import("../components/foodHome/FoodSearchVendors"));

const RenderCategorySection = () => {
  const {categoryBar}=useSelector(state=>state.food)
    switch (categoryBar) {
      case "Nearby":
        return <NearByFood />;
      // case "Promotion":
      //   return <FoodDiscountDeals />;
      case "New OnTrend":
        return <NewVendors />;
      case "Best Sellers":
        return <TopPicks />;
      // case "Top Rated":
      //   return <TopRated />;
      // case "New Dishes":
      //   return <TypeOfFoods />;
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
    <Suspense fallback={<OntrendLoading/>}>
    <div className="mt-14">
      <FoodSearchVendors/>
      {/* <FoodHomeHIgliteCarousel/> */}
     <FoodOffers/>
     {/* <TypeOfFoods/> */}
     <TopRated/>
     <CategoryBar/>
     <RenderCategorySection/>
     {/* <TopPicks/> */}
     <FoodDiscountDeals/>
    </div>
    </Suspense>
  )
}

export default Food
