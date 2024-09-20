import api from '@/utils/fethcer';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FormValuesType } from '@/types/edit/edit';

export async function getStudyEdit(study_id: number) {
  return await api.get({ url: `study/${study_id}` });
}

export const useGetStudyEdit = (study_id: number) => {
  return useQuery({
    queryKey: ['getStudyEdit', study_id],
    queryFn: () => getStudyEdit(study_id),
  });
};

async function studyPatch(study_id: number, formData: FormValuesType) {
  return await api.patch({
    url: `study/${study_id}`,
    body: formData,
  });
}

export const useStudyPatch = () => {
  return useMutation({
    mutationFn: ({
      study_id,
      formData,
    }: {
      study_id: number;
      formData: FormValuesType;
    }) => studyPatch(study_id, formData),
  });
};
