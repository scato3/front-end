import { constant } from "@/utils/constant";

interface CustomFetchOptions {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  bodyData?: Record<string, any> | null;
}

export const customFetch = async ({ endpoint, method = "GET", bodyData = null }: CustomFetchOptions) => {
  const requestOptions: RequestInit = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  if (method !== "GET" && bodyData) {
    requestOptions.body = JSON.stringify(bodyData);
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
