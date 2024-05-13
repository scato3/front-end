import api from "@/_lib/fetcher";

export default async function proposerStudy(token: string) {
  const data = await api.get({ endpoint: `user/proposer/study`, authorization: token });
  return data;
}
