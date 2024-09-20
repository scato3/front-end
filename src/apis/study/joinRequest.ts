import api from '@/utils/fethcer';
import { useQuery } from '@tanstack/react-query';

async function getJoinRequest(studyId: number) {
  await api.get({ url: `joinRequest/count/${studyId}` });
}

export async function useGetJoinRequest(studyId: number) {
  useQuery({
    queryKey: ['joinRequest'],
    queryFn: () => getJoinRequest(studyId),
  });
}
