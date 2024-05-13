import api from "@/_lib/fetcher";

export default async function GetPopularSearch() {
    const data = await api.get({endpoint:`userSearch/popular`});
    return data;
}