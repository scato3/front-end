import api from "@/_lib/fetcher";

export default async function getKey(pk: number) {
  const data = await api.get({ endpoint: `api/user/save-key?key=${pk}`, apiType: true });
  return data;
}
