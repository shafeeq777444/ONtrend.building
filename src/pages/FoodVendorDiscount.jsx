import FoodDiscountedVednorsList from '@/containers/FoodHome/FoodDiscountedVednorsList'
import React from 'react'
import { useParams } from 'react-router-dom'

const FoodVendorDiscount = () => {
    const{discountValue}=useParams()

  return (
    <FoodDiscountedVednorsList discountValue={discountValue}/>
  )
}

export default FoodVendorDiscount
