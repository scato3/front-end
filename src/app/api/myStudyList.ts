import api from "@/_lib/fetcher";

export default async function MyStudyList(token: string) {
  const data = await api.get({ endpoint: `user/progress/study`, authorization: token });
  return data;
}
