// src/hooks/useBuildings.js
import { getAllBuildings } from '@/supaBase/ProductApi'
import { useQuery } from '@tanstack/react-query'

// ------------- getALlBuildigs----------------------------
export function useBuildings() {
  return useQuery({
    queryKey: ['buildings'],
    queryFn: getAllBuildings,
    staleTime: 1000 * 60 * 5, // 5 mins cache
  })
}
