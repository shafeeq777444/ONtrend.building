import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setVendorMealCategory } from "@/shared/slices/food/foodSlice";
import isEqual from "fast-deep-equal"; // ✅ added deep comparison
// import SkeltonFoodCard from "@/shared/components/skeleton/SkeltonFoodCard";
import FoodCardInVendor from "../../components/FoodVendor/FoodCardInVendor";
import FoodOrderDetailModal from "../../components/FoodVendor/FoodOrderDetailModal";
import ModalPortal from "@/shared/components/common/ModalPortal";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= breakpoint);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isMobile;
}

const FoodVendorProducts = React.memo(
  ({ foodItems = [], venderLogo, isLoading, isOnline }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const isMobile = useIsMobile();
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(setVendorMealCategory("All"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, [dispatch]);

    const handleItemClick = useCallback((item) => {
      setSelectedItem(item);
    }, []);

    const handleClose = useCallback(() => {
      setSelectedItem(null);
    }, []);

    // if (isLoading) return <SkeltonFoodCard />;

    return (
      <div className="py-2 px-2 scrollbar-hide">
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 bg-white">
          {foodItems?.map((item) => (
            <FoodCardInVendor
              key={item.id}
              item={item}
              isOnline={isOnline}
              venderLogo={venderLogo}
              onClick={() => handleItemClick(item)}
            />
          ))}
        </div>

        {selectedItem && (
          <ModalPortal>
            <FoodOrderDetailModal
              onClose={handleClose}
              item={selectedItem}
              venderLogo={venderLogo}
              isMobile={isMobile}
            />
          </ModalPortal>
        )}
      </div>
    );
  },
  (prev, next) =>
    prev.isLoading === next.isLoading &&
    prev.isOnline === next.isOnline &&
    prev.venderLogo === next.venderLogo &&
    isEqual(prev.foodItems, next.foodItems)
);

export default FoodVendorProducts;
