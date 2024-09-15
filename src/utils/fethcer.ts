import queryString from 'query-string';
import { getAppCookie, setAppCookie } from './cookie';
import { FetchOptions } from '../types/fetchType';
import { isTokenExpired } from './isTokenExpired';
import { postRefreshToken } from '../apis/login/oauth';

let isRefreshing = false;

const _fetch = async ({
  body,
  method,
  query,
  refreshToken,
  url,
  revalidate,
  tags,
}: FetchOptions) => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const baseUrl = `${apiBaseUrl}/${url}`;
  const apiUrl = query
    ? `${baseUrl}?${queryString.stringify(query, { skipNull: true, skipEmptyString: true })}`
    : baseUrl;

  const refreshTokenKey = process.env
    .NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY as string;
  const accessTokenKey = process.env.NEXT_PUBLIC_COOKIE_TOKEN_KEY as string;

  let token = refreshToken
    ? getAppCookie(refreshTokenKey)
    : getAppCookie(accessTokenKey);

  let headers: HeadersInit = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  let requestOptions: RequestInit = {
    method,
    headers,
    cache: revalidate ? 'force-cache' : 'no-cache',
    ...(revalidate ? { next: { revalidate } } : {}),
    ...(tags ? { next: { tags } } : {}),
    ...(body && typeof body === 'object' ? { body: JSON.stringify(body) } : {}),
  };

  let res = await fetch(apiUrl, requestOptions);

  // 토큰이 만료되었고, 리프레시 토큰 요청 중이 아닐 때만 실행
  if (token && isTokenExpired(token) && !isRefreshing) {
    isRefreshing = true; // 리프레시 토큰 요청 진행 시작

    try {
      // 401 에러가 발생한 경우, 리프레시 토큰을 사용하여 새 액세스 토큰 발급
      const refreshResult = await postRefreshToken();

      // 새로운 액세스 토큰과 리프레시 토큰을 쿠키에 저장
      if (refreshResult.accessToken && refreshResult.refreshToken) {
        setAppCookie(accessTokenKey, refreshResult.accessToken);
        setAppCookie(refreshTokenKey, refreshResult.refreshToken);

        // 새로운 액세스 토큰으로 토큰 업데이트
        token = refreshResult.accessToken;
      } else {
        throw new Error('Invalid token response from refresh');
      }

      headers = {
        ...headers,
        Authorization: `Bearer ${refreshResult.accessToken}`,
      };

      // 요청을 다시 시도
      requestOptions = {
        ...requestOptions,
        headers,
      };
      res = await fetch(apiUrl, requestOptions);
    } catch (error) {
      throw new Error('Token refresh failed');
    } finally {
      isRefreshing = false;
    }
  }

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }

  const contentType = res.headers.get('Content-Type') || '';

  if (contentType.includes('application/json')) {
    return await res.json();
  } else if (
    contentType.includes('text/plain') ||
    contentType.includes('text/html')
  ) {
    return await res.text();
  }
};

const fetchMethod = (method: string) => (options: FetchOptions) => {
  return _fetch({ method, ...options });
};

const api = {
  get: fetchMethod('GET'),
  post: fetchMethod('POST'),
  patch: fetchMethod('PATCH'),
  put: fetchMethod('PUT'),
  delete: fetchMethod('DELETE'),
};

export default api;
