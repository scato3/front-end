import api from "@/_lib/fetcher";

export default async function DeleteGroupToDo( study_id: number, parent_todo_id:number, token: string) {
    const data = await api.delete({ endpoint: `study/${study_id}/todo?parent_todo_id=${parent_todo_id}`, authorization: token });
    return data;
}
