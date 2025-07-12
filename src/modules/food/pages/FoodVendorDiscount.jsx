
import React from 'react'
import { useParams } from 'react-router-dom'
import FoodDiscountedVednorsList from '../containers/food-home/FoodDiscountedVednorsList'

const FoodVendorDiscount = () => {
    const{discountValue}=useParams()

  return (
    <FoodDiscountedVednorsList  discountValue={discountValue}/>
  )
}

export default FoodVendorDiscount
