import BuildingCarouseImage from '@/modules/building/components/BuildingCarouseImage';
import { useBuildingDetail } from '@/shared/services/queries/building.query';
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
