// src/hooks/useBuildings.js
import { getAllBuildings, getBuildingDetail } from '@/supaBase/ProductApi'
import { useQuery } from '@tanstack/react-query'

// ------------- getALlBuildigs----------------------------
export function useBuildings() {
  return useQuery({
    queryKey: ['buildings'],
    queryFn: getAllBuildings,
    staleTime: 1000 * 60 * 5, // 5 mins cache
  })
}

export function useBuildingDetail(buildingId) {
  return useQuery({
    queryKey: ['building',buildingId],
    queryFn: ()=>getBuildingDetail(buildingId),
    staleTime: 1000 * 60 * 5, // 5 mins cache
  })
}