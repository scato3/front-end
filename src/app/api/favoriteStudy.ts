import api from "@/_lib/fetcher";

export default async function favoriteStudy(token: string) {
  const data = await api.get({ endpoint: `user/favorite/study`, authorization: token });
  return data;
}
