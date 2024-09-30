import queryString from 'query-string';
import { getAppCookie, setAppCookie } from './cookie';
import { FetchOptions } from '../types/fetchType';
import { isTokenExpired } from './isTokenExpired';
import { postRefreshToken } from '../apis/login/oauth';

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

const _fetch = async ({
  body,
  method,
  query,
  refreshToken,
  url,
  revalidate,
  tags,
  token: providedToken,
}: FetchOptions) => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const baseUrl = `${apiBaseUrl}/${url}`;
  const apiUrl = query
    ? `${baseUrl}?${queryString.stringify(query, {
        skipNull: true,
        skipEmptyString: true,
      })}`
    : baseUrl;

  const refreshTokenKey = process.env
    .NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY as string;
  const accessTokenKey = process.env.NEXT_PUBLIC_COOKIE_TOKEN_KEY as string;

  let token = providedToken
    ? providedToken
    : refreshToken
      ? getAppCookie(refreshTokenKey)
      : getAppCookie(accessTokenKey);

  if (token && isTokenExpired(token)) {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = postRefreshToken()
        .then((refreshResult) => {
          if (refreshResult.accessToken && refreshResult.refreshToken) {
            setAppCookie(accessTokenKey, refreshResult.accessToken);
            setAppCookie(refreshTokenKey, refreshResult.refreshToken);
            return refreshResult.accessToken;
          }
        })
        .catch((error) => {
          throw new Error(error.message);
        })
        .finally(() => {
          isRefreshing = false;
          refreshPromise = null;
        });
    }

    try {
      token = await refreshPromise!;
    } catch (error) {
      throw error;
    }
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const requestOptions: RequestInit = {
    method,
    headers,
    cache: revalidate ? 'force-cache' : 'no-cache',
    ...(revalidate ? { next: { revalidate } } : {}),
    ...(tags ? { next: { tags } } : {}),
    ...(body && typeof body === 'object' ? { body: JSON.stringify(body) } : {}),
  };

  const res = await fetch(apiUrl, requestOptions);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }

  const contentType = res.headers.get('Content-Type') || '';

  if (contentType.includes('application/json')) {
    return await res.json();
  }

  if (contentType.includes('text/plain') || contentType.includes('text/html')) {
    return await res.text();
  }

  return null; // JSON이나 텍스트가 아닌 다른 응답에 대한 기본값 처리
};

// HTTP 메서드별로 fetch 함수를 생성
const fetchMethod = (method: string) => (options: FetchOptions) => {
  return _fetch({ method, ...options });
};

// API 객체 정의
const api = {
  get: fetchMethod('GET'),
  post: fetchMethod('POST'),
  patch: fetchMethod('PATCH'),
  put: fetchMethod('PUT'),
  delete: fetchMethod('DELETE'),
};

export default api;
