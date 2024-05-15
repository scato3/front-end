import api from "@/_lib/fetcher";

interface IFastSearchProps {
  save: boolean;
  category: string | null;
  startDate: string | null;
  duration: string | null;
  mem_scope: number[];
  tendency: string[];
}

export default async function FastSearch(body: IFastSearchProps, token: string) {
  let queryString = "?";

  if (body.save !== undefined) {
    queryString += `save=${body.save}&`;
  }
  if (body.category !== null) {
    queryString += `category=${body.category}&`;
  }
  if (body.startDate !== null) {
    queryString += `startDate=${body.startDate}&`;
  }
  if (body.duration !== null) {
    queryString += `duration=${body.duration}&`;
  }
  if (body.mem_scope.length > 0) {
    queryString += `mem_scope=${body.mem_scope.join(",")}&`;
  }
  if (body.tendency.length > 0) {
    queryString += `tendency=${body.tendency.join(",")}&`;
  }

  if (queryString === "?") {
    queryString = "";
  }

  const data = await api.post({ endpoint: `study/quick/match${queryString}`, authorization: token });
  return data;
}
