import api from '@/utils/fethcer';
import { useQuery } from '@tanstack/react-query';
import { IGetRecentChatResponse } from '@/types/chat/chat';

async function getRecentChat(studyId: number): Promise<IGetRecentChatResponse> {
  return await api.get({
    url: `chat/api/message/${studyId}/recent`,
  });
}

export const useGetRecentChat = (studyId: number) => {
  return useQuery({
    queryKey: ['chat', 'recent', studyId],
    queryFn: () => getRecentChat(studyId),
    staleTime: 0,
  });
};
