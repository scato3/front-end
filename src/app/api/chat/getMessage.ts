import api from "@/_lib/fetcher";

export default async function getMessage(chatId: any, token: string) {
  const data = await api.get({ endpoint: `api/message/${chatId}`, authorization: token, apiType: true });
  return data;
}
