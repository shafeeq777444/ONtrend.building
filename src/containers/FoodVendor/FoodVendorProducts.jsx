import React, { useEffect, useState } from "react";
import FoodCardInVendor from "@/components/FoodVendor/FoodCardInVendor";
import { Drawer } from "@/components/ui/drawer";
import FoodVendorDrawer from "@/components/FoodVendor/FoodVendorDrawer";
import { useDispatch } from "react-redux";
import { setVendorMealCategory } from "@/features/food/foodSlice";


const FoodVendorProducts = ({ foodItems, venderLogo }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(setVendorMealCategory("All"))
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },[])
    return (
        <div className="py-4 px-2 max-w-[1000px] mx-auto">
            {/* Optional Title */}
            <div className="text-xl font-bold mb-4">&nbsp;</div>

            {/* Grid Layout */}
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <div className="grid gap-4 px-3 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                    {foodItems?.map((item) => (
                        <FoodCardInVendor
                            key={item.id}
                            item={item}
                            venderLogo={venderLogo}
                            onClick={() => {
                                setSelectedItem(item);
                                setIsDrawerOpen(true);
                            }}
                        />
                    ))}
                </div>
                <FoodVendorDrawer item={selectedItem} venderLogo={venderLogo} />
            </Drawer>
        </div>
    );
};

export default FoodVendorProducts;
