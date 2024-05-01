import api from "@/_lib/fetcher";

export default async function getKakaoCode(code: string | null) {
  const data = await api.get({ endpoint: `oauth/kakao?code=${code}` });
  const data2 = await api.post({ endpoint: "asd", body: "asd" });
  return data;
}
