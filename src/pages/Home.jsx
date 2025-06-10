// import React from 'react'

import DeliveringTo from "../components/common/DeliveryLocation";
import TopBar from "../components/common/TopBar";
import OurServices from "../components/home/OurService";
// import HorizontalCarousel from '../components/home/TopRestuarents'
// import TopGroceryStores from '../components/home/TopGrocery'
// import PharmacyUI from '../components/home/TopPharmacy'
import LoginCard from "../components/home/Login";
import Rewards from "../components/common/Rewards";
import Cart from "../components/common/Cart";
// import { useGetAllBanners } from '../hooks/queries/useBanner'
// import TopRestuarents from '../containers/Home/TopRestuarents'

const Home = () => {
    // const {data:banners} =  useGetAllBanners()

    return (
        <div className="">
            <div className="bg-blue-950 h-140 rounded-b-3xl fixed top-0 left-0 w-full  -z-10 ">
                <TopBar />
            </div>

            <div className="mt-140 z-50">
                <OurServices />
                <LoginCard />
            </div>
            {/* <TopRestuarents banners={banners}/> */}
            {/* <HorizontalCarousel/> */}
            {/* <TopGroceryStores/> */}
            {/* <PharmacyUI/> */}
        </div>
    );
};

export default Home;
