import api from "@/_lib/fetcher";

export default async function EditStudy( study_id: number, token: string) {
    const data = await api.patch({ endpoint: `study/${study_id}`, authorization: token });
    return data;
}
