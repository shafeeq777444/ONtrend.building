

import React from 'react'
import AllBuildings from '../containers/AllBuildings'

import DateRangeSelector from '../components/Common/DateRangeSelector'
import BuildingRoomSearchBar from '../containers/BuildingRoomSearchBar'


const RoomHome = () => {
  return (
      <div className="ml-2 mt-20">
<BuildingRoomSearchBar/>
{/* <AllBuildings/> */}
    </div>
  )
}

export default RoomHome
