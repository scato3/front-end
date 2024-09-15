import api from '@/utils/fethcer';
import { useQuery } from '@tanstack/react-query';

export async function getRecentSearch() {
  return await api.get({ url: 'userSearch/recent' });
}

export const useGetRecentSearch = () => {
  return useQuery({
    queryKey: ['recentSearch'],
    queryFn: () => getRecentSearch(),
  });
};

export async function deleteAllRecentSearch() {
  return await api.delete({ url: 'userSearch/recent' });
}

export async function deleteRecentSearch(keyword_id: number) {
  return await api.delete({ url: `userSearch/recent/${keyword_id}` });
}

export async function getPopularSearch() {
  return await api.get({ url: 'userSearch/popular' });
}

export const useGetPopularSearch = () => {
  return useQuery({
    queryKey: ['popularSearch'],
    queryFn: () => getPopularSearch(),
  });
};
