import api from "@/_lib/fetcher";

export default async function GetJoinRequest(study_id:number, token:string) {
    const data = await api.get({endpoint:`joinRequest/${study_id}`, authorization:token});
    return data;
}