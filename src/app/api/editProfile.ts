import api from "@/_lib/fetcher";
interface IProfileData {
  nickname: string | ArrayBuffer | null;
  profileImage: string | ArrayBuffer | null;
}
export default async function editProfile(body: IProfileData, token: string) {
  const data = await api.patch({ endpoint: `user/profile`, body, authorization: token });
  return data;
}
