import api from "@/_lib/fetcher";

export default async function GetRecentSearch(token:string) {
    const data = await api.get({endpoint:`userSearch/recent`, authorization: token});
    return data;
}