import api from "@/_lib/fetcher";

interface ISetStudyProps {
  category: string | null;
  title: string;
  description: string;
  tags: string[];
  start_date: string | null;
  duration: string | null;
  max_participants_num: number;
  matching_type: string | null;
  tendency: string | null;
}

export default async function setStudy(body: ISetStudyProps, token: string) {
  const data = await api.post({ endpoint: `study`, body, authorization: token });
  return data;
}
