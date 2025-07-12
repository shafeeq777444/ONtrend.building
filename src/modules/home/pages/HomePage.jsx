import LoginSection from "../components/LoginSection";
import TopRestuarents from "../containers/TopRestuarents";
import TopGroceries from "../containers/TopGroceries";
import TopPharmacies from "../containers/TopPharmacies";
import Highlites from "../containers/Highlites";
import ServiceGrid from "../components/grids/ServiceGrid";

const Home = () => {
    return (
        <div className="mt-14">
            {/* <div className=" z-50"> */}
            <ServiceGrid />
            {/* <OurServices /> */}
            <LoginSection />
            {/* </div> */}
            {/* <AdsBanner/> */}
            <TopRestuarents />
            <Highlites />
            <TopGroceries />
            <TopPharmacies />
        </div>
    );
};

export default Home;
