
import { useSelector } from "react-redux"
import CategoryBar from "../components/foodHome/CategoryBar"
import FoodDiscountDeals from "../containers/FoodHome/FoodDiscountDeals"
import FoodOffers from "../containers/FoodHome/FoodOffers"
import TopRated from "../containers/FoodHome/TopRated"
import NearByFood from "../containers/FoodHome/Category/NearByFoodVendors"
import NewVendors from "../containers/FoodHome/Category/NewVendors"
import TopPicks from "../containers/FoodHome/Category/TopPicks"
import FoodHomeHIgliteCarousel from "@/containers/FoodHome/FoodHomeHIgliteCarousel"

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
    <div className="mt-18">
      <FoodHomeHIgliteCarousel/>
     {/* <FoodHighlites/> */}
     <FoodOffers/>
     {/* <TypeOfFoods/> */}
     <TopRated/>
     <CategoryBar/>
     <RenderCategorySection/>
     {/* <TopPicks/> */}
     <FoodDiscountDeals/>
    </div>
  )
}

export default Food
