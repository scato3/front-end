import api from "@/_lib/fetcher";

export default async function addJoinToGroup(chatId: any, token: string) {
  const data = await api.put({ endpoint: `api/chat/join/add/${chatId}`, authorization: token, apiType: true });
  return data;
}
