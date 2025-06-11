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
import TopRestuarents from "../containers/Home/TopRestuarents";
import TopGroceries from "../containers/Home/TopGroceries";
import TopPharmacies from "../containers/Home/TopPharmacies";
import Highlites from "../containers/Home/Highlites";
import AdsBanner from "../containers/Home/AdsBanner";
import ServiceGrid from "../components/home/ServiceGrid";

const Home = () => {
    return (
        <div className="">
            <TopBar />
            <div className="relative aspect-[3/1] rounded-b-3xl overflow-hidden w-full -z-10">
                <img
                    src="/demo/demoHero.jpg"
                    className="absolute w-full h-full object-cover object-center"
                    alt="Discount Background"
                />
            </div>

            <div className=" z-50">
                <ServiceGrid/>
                {/* <OurServices /> */}
                <LoginCard />
            </div>
            {/* <AdsBanner/> */}
            <TopRestuarents />
            <Highlites />
            <TopGroceries />
            <TopPharmacies />
        </div>
    );
};

export default Home;
