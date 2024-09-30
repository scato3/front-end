import api from '@/utils/fethcer';
import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { PatchType } from '@/types/profile/patchType';

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

export async function getMyProfile(token?: string) {
  return await api.get({ url: 'user/profile/me', token });
}

async function patchMyProfile(data: PatchType) {
  return await api.patch({ url: 'user/profile', body: data });
}

export const usePatchMyProfile = () => {
  return useMutation({
    mutationFn: (data: PatchType) => patchMyProfile(data),
  });
};
