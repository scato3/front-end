import { constant } from "@/utils/constant";

interface IFetchOptions {
  endpoint: string;
  body?: any;
  authorization?: string;
}

export const GET = async ({ endpoint }: IFetchOptions) => {
  const authorization = "";
  const headers: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (authorization) {
    headers.Authorization = authorization;
  }

  const requestOptions: RequestInit = {
    method: "GET",
    headers,
  };

  try {
    const res = await fetch(constant.apiUrl + endpoint, requestOptions);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message);
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
};

export const POST = async ({ endpoint, body }: IFetchOptions) => {
  const authorization = "";
  const headers: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (authorization) {
    headers.Authorization = authorization;
  }

  const requestOptions: RequestInit = {
    method: "POST",
    headers,
    credentials: "include",
  };

  if (body) {
    requestOptions.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(constant.apiUrl + endpoint, requestOptions);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message);
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
};
