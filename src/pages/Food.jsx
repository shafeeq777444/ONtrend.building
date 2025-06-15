
import CategoryBar from "../components/food/CategoryBar"
import FoodDiscountDeals from "../containers/Food/FoodDiscountDeals"
import FoodHighlites from "../containers/Food/FoodHighlite"
import FoodOffers from "../containers/Food/FoodOffers"
import TopPicks from "../containers/Food/TopPicks"
import TopRated from "../containers/Food/TopRated"
import TypeOfFoods from "../containers/Food/TypeOfFoods"


const Food = () => {
  return (
    <div className="mt-18">
     {/* <FoodHighlites/> */}
     <FoodOffers/>
     <TypeOfFoods/>
     <TopRated/>
     <CategoryBar/>
     <TopPicks/>
     <FoodDiscountDeals/>
    </div>
  )
}

export default Food
