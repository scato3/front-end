import api from "@/_lib/fetcher";

export default async function GetStudyMembers(study_id:number, token:string) {
    const data = await api.get({endpoint:`study/${study_id}/user`, authorization:token});
    return data;
}