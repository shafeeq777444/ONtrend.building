import RestaurantCard from "../../components/home/RestuarentCard";


const TopRestuarents = ({banners=[]}) => {
    console.log(banners)
      const restuarentBanners = banners
    //   .filter(b => b.bannerType === 'Food');
  return (
    <div>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {restuarentBanners.map((banner) => (
          <RestaurantCard key={banner.id} banner={banner} />
        ))}
      </div>
    </div>
  )
}

export default TopRestuarents
