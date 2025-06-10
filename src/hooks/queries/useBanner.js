import { useQuery } from '@tanstack/react-query';
import { fetchAllDocuments } from '../../firebase/firestore';

export function useGetAllBanners() {
  return useQuery({
    queryKey: ['banners'],
    queryFn: () => fetchAllDocuments('banners'),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}