import api from "@/_lib/fetcher";

export default async function GetEditStudy( study_id: number, token: string) {
    const data = await api.get({ endpoint: `study/${study_id}/edit`, authorization: token });
    return data;
}
