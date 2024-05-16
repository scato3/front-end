import api from "@/_lib/fetcher";

export default async function JoinStudy(study_id:number, token: string) {
    const data = await api.post({ endpoint: `study/join/${study_id}`, authorization: token });
    return data;
}