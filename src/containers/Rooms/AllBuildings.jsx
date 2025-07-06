import BuildingCard from '@/components/Rooms/Card/BuildingCard'
import { useBuildings } from '@/hooks/queries/useBuildings'
import React from 'react'


const AllBuildings = () => {
  const { data = [] } = useBuildings()
  console.log(data)

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {data.map((building) => (
        <BuildingCard
          key={building.id}
          name={building.name_en}
          city={building.city}
          country={building.country}
          price={building.starting_amount}
          rating={building.star_rating}
          imageUrl={building?.building_media[0]?.images[0]}
        />
      ))}
    </div>
  )
}

export default AllBuildings
