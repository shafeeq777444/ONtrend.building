import BuildingCarouseImage from '@/components/Building/BuildingCarouseImage';
import { useBuildingDetail } from '@/hooks/queries/useBuildings';
import React from 'react'
import { useParams } from 'react-router-dom';

const BuildingDetails = () => {
        const { buildingId } = useParams();
    const { data } = useBuildingDetail(buildingId);
    console.log(data,"--builiding");
  return (
    <div className='mt-18'>
      
      <BuildingCarouseImage/>
    </div>
  )
}

export default BuildingDetails
