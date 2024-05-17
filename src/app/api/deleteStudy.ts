import api from "@/_lib/fetcher";

export default async function DeleteStudy( study_id: number, token: string) {
    const data = await api.delete({ endpoint: `study/${study_id}`, authorization: token });
    return data;
}
