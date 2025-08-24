import SkeltonDiscountedFoodCards from "@/shared/components/skeleton/SkeltonDiscountedFoodCards";
import React from "react";
import { useSelector } from "react-redux";
import FoodDiscountRestaurantCard from "../../components/FoodVendor/FoodDiscountRestaurantCard";
import { useGetAllFoodVendors } from "../../services/queries/useGetAllFoodVendors";
import EmptyStateCard from "@/shared/components/messages/EmptyStateCard";
import Marquee from "react-fast-marquee";
import MarqueeMessage from "@/shared/components/messages/MarqueMessage";

const FoodDiscountedVednorsList = ({ discountValue }) => {
    const {
        location: { lat, lng },
    } = useSelector((state) => state.user);

    const { data: vendors, isLoading } = useGetAllFoodVendors(lat, lng);
    const discountedVendors = vendors?.filter((vendor) => vendor.discountValue == discountValue);

     const offersList = [
                `${discountValue}% off vendors in Oman ONtrend`,
                `${discountValue}% off vendors in Oman ONtrend`,
                `${discountValue}% off vendors in Oman ONtrend`,
                `${discountValue}% off vendors in Oman ONtrend`,

            ];
    if (isLoading) {
        return (
            <div className="mt-16 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 py-6">
                {[...Array(12)].map((_, i) => (
                    <SkeltonDiscountedFoodCards key={i} />
                ))}
            </div>
        );
    }

    if (!discountedVendors?.length) {
        return (
            <div className="mt-16 w-full flex justify-center px-4 py-6">
                <EmptyStateCard
                    heading="No vendors found with this discount."
                    description="Try exploring other discounts or check back later for new offers."
                    lottieSrc="/lotties/errorOrWarnings/Discount.json"
                    notify={false}
                    width="64"
                    height="64"
                />
            </div>
        );
    }

    return (
        <>
           
            <MarqueeMessage offers={offersList} />
            <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-6">
                {discountedVendors.map((vendor) => (
                    <FoodDiscountRestaurantCard key={vendor.id} restaurant={vendor} />
                ))}
            </div>
        </>
    );
};

export default FoodDiscountedVednorsList;
