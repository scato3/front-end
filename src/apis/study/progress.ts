import api from '@/utils/fethcer';
import { useQuery } from '@tanstack/react-query';

export async function getProgressStudy() {
  return await api.get({ url: 'user/progress/study' });
}

export const useGetProgressStudy = () => {
  return useQuery({
    queryKey: ['getProgressStudy'],
    queryFn: () => getProgressStudy(),
  });
};
