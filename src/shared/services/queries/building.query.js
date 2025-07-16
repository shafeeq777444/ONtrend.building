// src/hooks/useBuildings.js
import { getAllBuildings, getBuildingDetail, getRoomDetail, getRoomsBasedOnBuildingId } from '@/lib/supabase/ProductApi'
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

export function useRoomsBasedOnBuildingId(buildingId) {
  return useQuery({
    queryKey: ['rooms',buildingId],
    queryFn: ()=>getRoomsBasedOnBuildingId(buildingId),
    staleTime: 1000 * 60 * 5, // 5 mins cache
  })
}

export function useRoomDetail(roomId) {
  return useQuery({
    queryKey: ['room',roomId],
    queryFn: ()=>getRoomDetail(roomId),
    staleTime: 1000 * 60 * 5, // 5 mins cache
  })
}