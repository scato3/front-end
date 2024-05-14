import api from "@/_lib/fetcher";

export default async function DeleteRecentSearch(token: string, id: number) {
  const data = await api.delete({ endpoint: `userSearch/recent/${id}`, authorization: token });
  return data;
}
