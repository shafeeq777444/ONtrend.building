import BuildingCard from '@/components/Rooms/Card/BuildingCard'
import RoomSearchBar from '@/components/Rooms/Common/RoomSearchBar'
import DateRangeSelector from '@/components/Rooms/Search/DateRangeSelector'
import GuestSelector from '@/components/Rooms/Search/GuestSelector'
import AllBuildings from '@/containers/Rooms/AllBuildings'
import React from 'react'

const RoomHome = () => {
  return (
      <div className="ml-2 mt-16">
{/* <RoomSearchBar/> */}
{/* <BuildingCard/> */}
<AllBuildings/>
{/* <GuestSelector/> */}
{/* <DateRangeSelector/> */}
    </div>
  )
}

export default RoomHome
