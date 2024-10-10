import api from '@/utils/fethcer';
import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { PatchType } from '@/types/profile/patchType';
import { MyProfileType } from '@/types/profile/profileType';

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

export async function getMyProfile() {
  return await api.get({ url: 'user/profile/me' });
}

export const useGetMyProfile = () => {
  return useQuery<MyProfileType>({
    queryKey: ['myProfile'],
    queryFn: getMyProfile,
  });
};

async function patchMyProfile(data: PatchType) {
  return await api.patch({ url: 'user/profile', body: data });
}

export const usePatchMyProfile = () => {
  return useMutation({
    mutationFn: (data: PatchType) => patchMyProfile(data),
  });
};

async function getCheckDuplicateProfile(nickname: string) {
  return await api.get({ url: `user/nickname/${nickname}` });
}

export const useGetCheckDuplicateProfile = (nickname: string) => {
  return useQuery({
    queryKey: ['duplicate', nickname],
    queryFn: () => getCheckDuplicateProfile(nickname),
    enabled: false,
  });
};

export async function getMyFavoriteStudy(token?: string) {
  return await api.get({ url: 'user/favorite/study', token });
}
