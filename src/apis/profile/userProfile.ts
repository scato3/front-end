import api from '@/utils/fethcer';
import { useQuery } from '@tanstack/react-query';

export async function getUserProfile(data: string) {
  return await api.get({ url: 'user/profile', query: { nickname: data } });
}

export const useGetUserProfile = (data: string) => {
  return useQuery({
    queryKey: ['getUserProfile', data],
    queryFn: () => getUserProfile(data),
    staleTime: 30000,
  });
};
