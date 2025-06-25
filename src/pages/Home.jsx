// import React from 'react'

import DeliveringTo from "../components/common/DeliveryLocation";
// import TopBar from "../components/common/TopBar";
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
import HeroSection from "../components/home/HeroSection";

const Home = () => {
    return (
        <div className="mt-14">
            {/* <TopBar /> */}
            {/* <div className="relative h-[80vh]  overflow-hidden w-full -z-10">
                <img
                    src="/demo/heroLarge.jpg"
                    className="absolute w-full h-full object-cover object-center"
                    alt="Discount Background"
                    loading="lazy"
                />
                 <div className="absolute inset-0 bg-black/30  transition duration-300" />
            </div> */}
            {/* <HeroSection/> */}

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
