import FoodDiscountRestaurantCard from '@/components/FoodVendor/FoodDiscountRestaurantCard';
import SkeltonDiscountedFoodCards from '@/shared/components/skeleton/SkeltonDiscountedFoodCards';
import { useGetAllFoodVendors } from '@/shared/services/queries/vendors.query';
import React from 'react';
import { useSelector } from 'react-redux';


const FoodDiscountedVednorsList = ({ discountValue }) => {
  const {
    location: { lat, lng },
  } = useSelector((state) => state.user);

  const { data: vendors , isLoading} = useGetAllFoodVendors(lat, lng);
  const discountedVendors = vendors?.filter(
    (vendor) => vendor.discountValue == discountValue
  );
  if(isLoading)  {
   return(
   <div className="mt-16 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 py-6">
  {[...Array(12)].map((_, i) => (
    <SkeltonDiscountedFoodCards key={i} />
  ))}
  </div>)

  }
  

  return (
    <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-6">
      {discountedVendors?.length > 0 ? (
        discountedVendors.map((vendor) => (
          <FoodDiscountRestaurantCard key={vendor.id} restaurant={vendor} />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">No vendors found with this discount.</p>
      )}
    </div>
  );
};

export default FoodDiscountedVednorsList;
