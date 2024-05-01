import api from "@/_lib/fetcher";

export default async function getKakaoCode(code: string | null) {
  const data = await api.get({ endpoint: `oauth/kakao?code=${code}` });
  return data;
}
