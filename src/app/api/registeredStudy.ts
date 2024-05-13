import api from "@/_lib/fetcher";

export default async function registeredStudy(token: string, status: string | null) {
  const data = await api.get({
    endpoint: !status ? `user/registered/study` : `user/registered/study?status=${status}`,
    authorization: token,
  });
  return data;
}
