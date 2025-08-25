import SkeltonDiscountedFoodCards from "@/shared/components/skeleton/SkeltonDiscountedFoodCards";
import React from "react";
import { useSelector } from "react-redux";
import FoodDiscountRestaurantCard from "../../components/FoodVendor/FoodDiscountRestaurantCard";
import { useGetAllFoodVendors } from "../../services/queries/useGetAllFoodVendors";
import EmptyStateCard from "@/shared/components/messages/EmptyStateCard";
import MarqueeMessage from "@/shared/components/messages/MarqueMessage";
import { useTranslation } from "react-i18next";

const FoodDiscountedVednorsList = ({ discountValue }) => {
    const { i18n } = useTranslation();
    const isArabic = i18n.language === "ar";

    const {
        location: { lat, lng },
    } = useSelector((state) => state.user);

    const { data: vendors, isLoading } = useGetAllFoodVendors(lat, lng);

    // Filter vendors with the given discount
    const discountedVendors = vendors?.filter((vendor) => vendor.discountValue == discountValue);

    // Bilingual offers list
    const offersList = Array(4).fill(
        isArabic
            ? `خصم ${discountValue}% على المطاعم في عمان ONtrend`
            : `${discountValue}% off vendors in Oman ONtrend`
    );

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
                    heading={isArabic ? "لم يتم العثور على مطاعم بهذا الخصم" : "No vendors found with this discount."}
                    description={
                        isArabic
                            ? "جرّب استكشاف خصومات أخرى أو تحقق لاحقًا من العروض الجديدة."
                            : "Try exploring other discounts or check back later for new offers."
                    }
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-6">
                {discountedVendors.map((vendor) => (
                    <FoodDiscountRestaurantCard key={vendor.id} restaurant={vendor} />
                ))}
            </div>
        </>
    );
};

export default FoodDiscountedVednorsList;
