import api from "@/_lib/fetcher";

export default async function GetTodos(study_id:number) {
    const data = await api.get({endpoint:`study/${study_id}/todo_management`});
    return data;
}