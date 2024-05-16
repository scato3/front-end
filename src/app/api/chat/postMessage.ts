import api from "@/_lib/fetcher";

export default async function postMessage(body: any, token: string) {
  const data = await api.post({ endpoint: `api/message`, body, authorization: token, apiType: true });
  return data;
}
