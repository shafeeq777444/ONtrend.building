import React from "react";
// import { useParams } from 'react-router-dom'
import FoodVendorHeader from "../components/FoodVendor/FoodVendorHeader";
import FoodVendorDetails from "../components/FoodVendor/FoodVendorDetails";
import FoodOrderComputerOrder from "../components/FoodVendor/FoodOrderComputerOrder";
import FoodVendorMealCategory from "../components/FoodVendor/FoodVendorMealCategory";
import FoodVendorPopular from "@/containers/FoodVendor/FoodVendorPopular";

const FoodVender = () => {
    // const{vendorId}=useParams()
    return (
        <div className="flex mt-18 flex-col md:flex-row gap-4">
            {/* Left side: Main content (like food items) */}
            <div className="flex-1">
                 <FoodVendorHeader />
                <FoodVendorDetails />
                <FoodVendorPopular/>
                <FoodVendorMealCategory/>
            </div>

            {/* Right side: Order summary - show only on tablet/desktop */}
            <div className="hidden md:block w-full md:w-[340px]">
                <div className="sticky top-4">
                    <FoodOrderComputerOrder />
                </div>
            </div>
        </div>
    );
};

export default FoodVender;
