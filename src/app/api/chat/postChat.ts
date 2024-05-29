import api from "@/_lib/fetcher";
interface ISetChatProps {
  studyId: string;
  pk: string;
  name: string;
}
export default async function postChat(body: ISetChatProps, token: string) {
  const data = await api.post({ endpoint: `api/chat/study`, body, authorization: token, apiType: true });
  return data;
}
