import api from "@/_lib/fetcher";

interface ISetToDoProps {
  content: string;
  date: string;
}

export default async function SetPersonalToDo(body: ISetToDoProps, study_id:number, token: string) {
  const data = await api.post({ endpoint: `study/${study_id}/todo`, body, authorization: token });
  return data;
}

