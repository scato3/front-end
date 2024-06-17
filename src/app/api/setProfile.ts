import api from "@/_lib/fetcher";
interface IProfileData {
  nickname: string | ArrayBuffer | null;
  profileImage: string | ArrayBuffer | null;
}
export default async function setProfile(body: IProfileData, token: string) {
  const data = await api.post({ endpoint: `user/profile`, body, authorization: token });
  return data;
}
