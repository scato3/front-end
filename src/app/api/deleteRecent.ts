import api from "@/_lib/fetcher";

export default async function DeleteRecentSearch(token:string) {
    const data = await api.patch({endpoint:`userSearch/recent`, authorization: token});
    return data;
}