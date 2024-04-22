import { constant } from "@/utils/constant";

interface CustomFetchOptions {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
}

export const Fetcher = async ({ endpoint, method, body }: CustomFetchOptions) => {
  const requestOptions: RequestInit = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  if (method === "POST" && body) {
    requestOptions.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(constant.apiUrl + endpoint, requestOptions);

    if (res.ok) {
      return await res.json();
    } else {
      const errorData = await res.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    console.error(error);
  }
};
