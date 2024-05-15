import api from "@/_lib/fetcher";

export default async function GetStudyInfo(study_id:number) {
    const data = await api.get({endpoint:`study/${study_id}`});
    return data;
}