import api from "@/_lib/fetcher";

interface ICheckToDo {
    todo_id:number;
    complete:boolean;
}

export default async function CheckToDo( study_id: number, token: string, body:ICheckToDo) {
    const data = await api.patch({ endpoint: `study/${study_id}/todo`, body, authorization: token });
    return data;
}
