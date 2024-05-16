import api from "@/_lib/fetcher";

export default async function chat(studyId: string, token: string) {
  const data = await api.get({ endpoint: `api/chat/${studyId}`, authorization: token, apiType: true });
  return data;
}
