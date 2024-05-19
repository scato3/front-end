import api from "@/_lib/fetcher";

export default async function GetJoinRequestCount(study_id:number, token:string) {
    const data = await api.get({endpoint:`joinRequest/count/${study_id}`, authorization:token});
    return data;
}