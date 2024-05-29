import api from "@/_lib/fetcher";

export default async function GetTodos(study_id:number, nickname:string, date:string, token:string) {
    const data = await api.get({endpoint:`study/${study_id}/todo_management?nickname=${nickname}&date=${date}`, authorization:token});
    return data;
}