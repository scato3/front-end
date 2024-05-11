import { constant } from "@/utils/constant";

interface IFetchOptions {
  endpoint: string;
  body?: any;
  method?: string;
  authorization?: string;
}

interface IGetOptions {
  endpoint: string;
}

interface IPostOptions {
  endpoint: string;
  body?: any;
  authorization: string;
}

const _fetch = async ({ method, endpoint, body, authorization }: IFetchOptions) => {
  const headers: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (authorization) {
    headers.Authorization = "Bearer " + authorization;
  }

  const requestOptions: RequestInit = {
    method,
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

const _get = async ({ endpoint }: IGetOptions) => {
  return _fetch({ method: "GET", endpoint });
};

const _post = async ({ endpoint, body, authorization }: IPostOptions) => {
  return _fetch({ method: "POST", endpoint, body, authorization });
};

const _patch = async ({ endpoint, body, authorization }: IPostOptions) => {
  return _fetch({ method: "PATCH", endpoint, body, authorization });
};

const api = {
  get: _get,
  post: _post,
  patch: _patch,
};

export default api;
