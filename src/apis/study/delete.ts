import api from '@/utils/fethcer';
import { useMutation } from '@tanstack/react-query';

async function deleteStudy(study_id: number) {
  return await api.delete({ url: `study/${study_id}` });
}

export const useDeleteStudy = () => {
  return useMutation({
    mutationFn: (study_id: number) => deleteStudy(study_id),
  });
};
