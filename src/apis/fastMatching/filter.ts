import { QuickFilterType } from '@/types/fastMatching/filterType';
import api from '@/utils/fethcer';
import { useMutation } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

async function postStudyFilter(data: QuickFilterType) {
  return await api.post({ url: 'study/quick/match', body: data });
}

export const usePostStudyFilter = () => {
  return useMutation({
    mutationFn: (data: QuickFilterType) => postStudyFilter(data),
  });
};

async function getStudyFilter() {
  try {
    const response = await api.get({ url: 'study/quick/filter' });

    if (response) {
      return response;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const useGetStudyFilter = () => {
  return useQuery({
    queryKey: ['getFilter'],
    queryFn: () => getStudyFilter(),
  });
};
