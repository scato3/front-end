import api from "@/_lib/fetcher";

export default async function removeJoinToGroup(chatId: any, token: string) {
  const data = await api.put({ endpoint: `api/chat/join/remove/${chatId}`, authorization: token, apiType: true });
  return data;
}
