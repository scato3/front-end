import api from "@/_lib/fetcher";

export default async function AddFavoriteStudy(study_id:number, token: string) {
    const data = await api.post({ endpoint: `study/${study_id}/favorite`, authorization: token });
    return data;
}