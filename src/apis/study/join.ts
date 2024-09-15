import api from '@/utils/fethcer';
import { useMutation } from '@tanstack/react-query';

async function postJoinStudy(study_id: number) {
  return await api.post({ url: `study/join/${study_id}` });
}

export const usePostJoinStudy = () => {
  return useMutation({
    mutationFn: (study_id: number) => postJoinStudy(study_id),
  });
};
