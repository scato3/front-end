import api from '@/utils/fethcer';
import { useMutation } from '@tanstack/react-query';
import { CreateStudyDataType } from '@/types/createStudy/create';

async function postCreateStudy(data: CreateStudyDataType) {
  return await api.post({ url: `study`, body: data });
}

export const usePostCreateStudy = () => {
  return useMutation({
    mutationFn: (data: CreateStudyDataType) => postCreateStudy(data),
  });
};
