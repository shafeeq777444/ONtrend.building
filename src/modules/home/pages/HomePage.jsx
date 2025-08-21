import LoginSection from "../components/LoginSection";
import TopRestuarents from "../containers/TopRestuarents";
import TopGroceries from "../containers/TopGroceries";
import TopPharmacies from "../containers/TopPharmacies";
import Highlites from "../containers/Highlites";
import ServiceGrid from "../components/grids/ServiceGrid";
import { useState } from "react";
import LazyRenderOnView from "@/shared/components/performanceOptimised/LazyRenderOnView";

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
            <LazyRenderOnView>
                <TopRestuarents setBannerON={setTopRestaurents} />
            </LazyRenderOnView>
            <LazyRenderOnView>
                {topRestuarents&& topGroceries&&topPharmacies && <Highlites />}
            </LazyRenderOnView>
            <LazyRenderOnView>
                <TopGroceries setBannerON={setTopGroceries} />
            </LazyRenderOnView>
            <LazyRenderOnView>
                <TopPharmacies  setBannerON={setTopPharmacies} />
            </LazyRenderOnView>
        </div>
    );
};

export default Home;
