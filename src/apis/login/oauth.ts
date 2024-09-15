import api from '@/utils/fethcer';
import { useQuery } from '@tanstack/react-query';
import { getKakaoCodeType } from '@/types/login/login';

async function getKakaoCode(data: getKakaoCodeType) {
  return await api.get({ url: 'oauth/kakao', query: data });
}

export const useGetKakaoCode = (data: getKakaoCodeType) => {
  return useQuery({
    queryKey: ['oauth', 'kakao', data],
    queryFn: () => getKakaoCode(data),
  });
};

export async function postRefreshToken() {
  return await api.post({
    url: 'auth/refresh/token',
    refreshToken: true,
  });
}
