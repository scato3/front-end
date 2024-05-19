import api from "@/_lib/fetcher";

export default async function AcceptJoinStudy(study_id: number, user_id:number, token: string) {
    const data = await api.post({ endpoint: `joinRequest/accept?studyId=${study_id}&userId=${user_id}`, authorization: token });
    return data;
}
