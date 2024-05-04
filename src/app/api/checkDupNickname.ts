import api from "@/_lib/fetcher";

export default async function checkDupNickname(nickname: string) {
  const { duplicate } = await api.get({ endpoint: `user/nickname/${nickname}` });
  return duplicate;
}
