import api from '@/utils/fethcer';
import { useQuery } from '@tanstack/react-query';

export async function getStudyDetail(study_id: number) {
  return await api.get({ url: `study/${study_id}` });
}

export const useGetStudyDetail = (study_id: number) => {
  return useQuery({
    queryKey: ['getStudyDetail', study_id],
    queryFn: () => getStudyDetail(study_id),
    staleTime: 10000,
  });
};
