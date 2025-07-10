import React, { useEffect, useRef, useState } from "react";

import { Drawer, DrawerContent } from "@/shared/components/ui/drawer";

import { useDispatch } from "react-redux";
import { setVendorMealCategory } from "@/shared/slices/food/foodSlice";

import ModalPortal from "@/shared/components/common/ModalPortal";
import SkeltonFoodCard from "@/shared/components/skeleton/SkeltonFoodCard";
import FoodCardInVendor from "../../components/FoodVendor/FoodCardInVendor";
import FoodVendorDrawer from "../../components/FoodVendor/FoodVendorDrawer";
import FoodOrderDetailModal from "../../components/FoodVendor/FoodOrderDetailModal";

const FoodVendorProducts = ({ foodItems = [], venderLogo ,isLoading,isOnline}) => {
    // ****** states ******
    const [selectedItem, setSelectedItem] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const dispatch = useDispatch();
    const [isMobile, setIsMobile] = useState(false);

  
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize(); // check on load
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    useEffect(() => {
        dispatch(setVendorMealCategory("All"));
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
    if(isLoading){
        return(<><SkeltonFoodCard/></>)
    }

    return (
        <div className=" py-2 px-2  scrollbar-hide">
            {/* Optional Title */}
            <div className="text-xl font-bold mb-4">&nbsp;</div>

            <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                {foodItems?.map((item) => (
                    <FoodCardInVendor
                        key={item.id}
                        item={item}
                        isOnline={isOnline}
                        venderLogo={venderLogo}
                        onClick={() => {
                            setSelectedItem(item);
                            if (isMobile) {
                                setIsDrawerOpen(true);
                            }
                        }}
                    />
                ))}
            </div>
            {isMobile ? (
                <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                    <DrawerContent className="bg-white text-black p-0 h-auto flex flex-col">
                        <FoodVendorDrawer
                            onClose={() => {
                                setIsDrawerOpen(false);
                                setSelectedItem(null);
                            }}
                            item={selectedItem}
                            venderLogo={venderLogo}
                        />
                    </DrawerContent>
                </Drawer>
            ) : (
                selectedItem && (
                        <ModalPortal>
                            <FoodOrderDetailModal
                                onClose={() => setSelectedItem(null)}
                                item={selectedItem}
                                venderLogo={venderLogo}
                            />
                        </ModalPortal>

                )
            )}
        </div>
    );
};

export default FoodVendorProducts;
