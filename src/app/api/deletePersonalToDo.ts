import api from "@/_lib/fetcher";

export default async function DeletePersonalToDo( study_id: number, todo_id:number, token: string) {
    const data = await api.delete({ endpoint: `study/${study_id}/todo?todo_id=${todo_id}`, authorization: token });
    return data;
}
