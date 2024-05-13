import api from "@/_lib/fetcher";

export default async function myProfile(token: string) {
  const data = await api.get({ endpoint: `user/profile/me`, authorization: token });
  return data;
}
