import LoginSection from "../components/LoginSection";
import TopRestuarents from "../containers/TopRestuarents";
import TopGroceries from "../containers/TopGroceries";
import TopPharmacies from "../containers/TopPharmacies";
import Highlites from "../containers/Highlites";
import ServiceGrid from "../components/grids/ServiceGrid";
import { useState } from "react";

const Home = () => {
    const [topRestuarents,setTopRestaurents]=useState(true)    
    const [topGroceries,setTopGroceries]=useState(true)    
    const [topPharmacies,setTopPharmacies]=useState(true)    
    return (
        <div className="">
            {/* <div className=" z-50"> extras not remove */}
            <ServiceGrid />
            {/* <OurServices /> extras not remove */}
            <LoginSection />
            {/* </div> extras not remove */}
            {/* <AdsBanner/> extras not remove */}
            <TopRestuarents setBannerON={setTopRestaurents} />
            {topRestuarents&& topGroceries&&topPharmacies && <Highlites />}
            <TopGroceries setBannerON={setTopGroceries} />
            <TopPharmacies  setBannerON={setTopPharmacies} />
        </div>
    );
};

export default Home;
