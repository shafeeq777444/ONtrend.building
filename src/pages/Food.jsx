
import FoodDiscountDeals from "../containers/Food/FoodDiscountDeals"
import FoodHighlites from "../containers/Food/FoodHighlite"
import FoodOffers from "../containers/Food/FoodOffers"
import TopPicks from "../containers/Food/TopPicks"
import TopRated from "../containers/Food/TopRated"


const Food = () => {
  return (
    <div>
     <FoodHighlites/>
     <FoodOffers/>
     <TopRated/>
     <TopPicks/>
     <FoodDiscountDeals/>
    </div>
  )
}

export default Food
