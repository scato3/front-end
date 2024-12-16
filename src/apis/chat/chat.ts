import api from '@/utils/fethcer';
import { useQuery } from '@tanstack/react-query';
import {
  FindType,
  IGetRecentChatResponse,
  TargetType,
} from '@/types/chat/chat';

async function getRecentChat(studyId: number): Promise<IGetRecentChatResponse> {
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

async function getTargetChat(
  studyId: number,
  data: TargetType
): Promise<IGetRecentChatResponse> {
  return await api.get({
    url: `chat/api/message/${studyId}`,
    query: data,
  });
}

export const useGetTargetChat = (studyId: number, data: TargetType) => {
  return useQuery({
    queryKey: ['chat', 'target', studyId, data],
    queryFn: () => getTargetChat(studyId, data),
    enabled: false,
  });
};

async function getFindChat(studyId: number, data: FindType) {
  return await api.get({
    url: `chat/api/message/${studyId}`,
    query: data,
  });
}

export const useGetFindChat = (studyId: number, data: FindType) => {
  return useQuery({
    queryKey: ['chat', 'find', studyId, data],
    queryFn: () => getFindChat(studyId, data),
    enabled: false,
  });
};
