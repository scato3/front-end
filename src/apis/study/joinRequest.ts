import api from '@/utils/fethcer';
import { useQuery } from '@tanstack/react-query';

async function getJoinRequest(studyId: number) {
  return await api.get({ url: `joinRequest/count/${studyId}` });
}

export function useGetJoinRequest(studyId: number) {
  return useQuery({
    queryKey: ['joinRequest'],
    queryFn: () => getJoinRequest(studyId),
  });
}
