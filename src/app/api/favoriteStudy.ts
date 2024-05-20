import api from "@/_lib/fetcher";

export default async function FavoriteStudy(token: string) {
  const data = await api.get({ endpoint: `user/favorite/study`, authorization: token });
  return data;
}
