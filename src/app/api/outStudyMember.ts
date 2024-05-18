import api from "@/_lib/fetcher";

export default async function OutStudyMember(
    study_id:number, 
    userId:number, 
    exitReasons: string[],
    token: string ) {
    const data = await api.post({ endpoint: `study/${study_id}/user/out?userId=${userId}&exitReasons=${exitReasons.join(",")}`, authorization: token });
    return data;
}