import api from "@/_lib/fetcher";

export default async function allStudySearch() {
  const { data } = await api.get({ endpoint: `study` });
  return data;
}
