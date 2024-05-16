import api from "@/_lib/fetcher";

export default async function DeleteFavoriteStudy(study_id:number, token: string) {
    const data = await api.delete({ endpoint: `study/${study_id}/favorite`, authorization: token });
    return data;
}