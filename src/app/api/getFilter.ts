import api from "@/_lib/fetcher";

export default async function getFilter(
  type: string,
  orderType: string,
  options?: {
    quickMatch?: string;
    category?: string | null;
    startDate?: string | null;
    duration?: string | null;
    minParticipants?: number;
    maxParticipants?: number;
    tendency?: string;
  },
) {
  let endpoint = `study/${type}/filter?orderType=${orderType}`;

  if (options) {
    const queryParams = new URLSearchParams();

    if (options.quickMatch !== undefined && options.quickMatch !== "") {
      queryParams.append("quickMatch", options.quickMatch);
    }

    if (options.category) {
      queryParams.append("category", options.category);
    }

    if (options.startDate && !isNaN(Date.parse(options.startDate))) {
      queryParams.append("startDate", options.startDate);
    }

    if (options.duration !== null && options.duration !== undefined && !isNaN(Number(options.duration))) {
      queryParams.append("duration", options.duration.toString());
    }

    if (options.minParticipants !== undefined && !isNaN(options.minParticipants)) {
      queryParams.append("minParticipants", options.minParticipants.toString());
    }

    if (options.maxParticipants !== undefined && !isNaN(options.maxParticipants)) {
      queryParams.append("maxParticipants", options.maxParticipants.toString());
    }

    if (options.tendency && !isNaN(Number(options.tendency))) {
      queryParams.append("tendency", options.tendency);
    }

    if (queryParams.toString()) {
      endpoint += `&${queryParams.toString()}`;
    }
  }

  const data = await api.get({ endpoint });
  return data;
}
