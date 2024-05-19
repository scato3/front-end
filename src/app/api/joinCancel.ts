import api from "@/_lib/fetcher";

export default async function JoinCancel(study_id: number, token: string) {
  const data = await api.post({
    endpoint: `joinRequest/cancel?studyId=${study_id}`,
    authorization: token,
  });
  return data;
}
