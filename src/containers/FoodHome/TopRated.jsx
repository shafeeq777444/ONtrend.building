import React from "react";
import TopRatedCards from "../../components/foodHome/TopRatedCard";
import { useGetAllTopVendors } from "../../hooks/queries/useVendors";
import { useSelector } from "react-redux";
import SkeltonTopRated from "@/components/skeleton/SkeltonTopRated";
import { useTranslation } from "react-i18next";

export default function TopRated() {
  const { location: { lat, lng } } = useSelector(state => state.user);
  const { data: allTopVendors, isLoading } = useGetAllTopVendors(lat, lng);
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const foodTopVendors =
    allTopVendors?.filter((vendor) => vendor.vendorType === "Food/Restaurant") || [];

  const shuffledVendors = [...foodTopVendors].sort(() => 0.5 - Math.random());
  const randomSixVendors = shuffledVendors.slice(0, 8);

  if (isLoading || !randomSixVendors || randomSixVendors.length === 0) {
    return <SkeltonTopRated />;
  }

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8">
      <div className="mx-auto">
        {/* Heading */}
        <div className={`mb-6 text-center ${isArabic ? "lg:text-right" : "lg:text-left"}`}>
          <h2 className="text-2xl font-bold text-gray-800">
            {isArabic ? "الأعلى تقييماً" : "Top Rated"}
          </h2>
          {/* Optional Subtitle */}
          {/* <p className="text-sm text-gray-500">{isArabic ? "اكتشف المتاجر الشعبية القريبة منك" : "Explore popular stores near you"}</p> */}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {randomSixVendors.map((vendor, index) => (
            <TopRatedCards key={index} vendor={vendor} />
          ))}
        </div>
      </div>
    </section>
  );
}
