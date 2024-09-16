import api from '@/utils/fethcer';
import { useMutation } from '@tanstack/react-query';

export async function postFavoriteStudy(study_id: number) {
  return await api.post({ url: `study/${study_id}/favorite` });
}

export const usePostFavoriteStudy = () => {
  return useMutation({
    mutationFn: (study_id: number) => postFavoriteStudy(study_id),
  });
};

export async function deleteFavoriteStudy(study_id: number) {
  return await api.delete({ url: `study/${study_id}/favorite` });
}

export const useDeleteFavoriteStudy = () => {
  return useMutation({
    mutationFn: (study_id: number) => deleteFavoriteStudy(study_id),
  });
};
