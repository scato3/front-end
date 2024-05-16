import api from "@/_lib/fetcher";

export default async function GetQuickFiler(token: string) {
  const data = await api.get({ endpoint: `study/quick/filter`, authorization: token });
  return data;
}
