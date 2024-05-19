import api from "@/_lib/fetcher";

export default async function DeclineJoinStudy(study_id: number, user_id:number, token: string) {
    const data = await api.post({ endpoint: `joinRequest/reject?studyId=${study_id}&userId=${user_id}`, authorization: token });
    return data;
}
