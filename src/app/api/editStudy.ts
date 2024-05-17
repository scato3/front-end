import api from "@/_lib/fetcher";

interface IStudyData {
    title: string;
    description: string;
    tags: string[];
}

export default async function EditStudy( study_id: number, token: string, body:IStudyData) {
    const data = await api.patch({ endpoint: `study/${study_id}`, body, authorization: token });
    return data;
}
