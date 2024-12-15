import api from '@/utils/fethcer';
import { useQuery } from '@tanstack/react-query';

async function getRecentChat(studyId: number) {
  return await api.get({
    url: `chat/api/message/${studyId}/recent`,
  });
}

export const useGetRecentChat = (studyId: number) => {
  return useQuery({
    queryKey: ['chat', 'recent', studyId],
    queryFn: () => getRecentChat(studyId),
  });
};
