import { isTokenExpired } from './utils/isTokenExpired';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = process.env.NEXT_PUBLIC_COOKIE_TOKEN_KEY as string;
  const refresh = process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY as string;
  const accessToken = req.cookies.get(token)?.value;
  const refreshToken = req.cookies.get(refresh)?.value;
  const checkLogin = req.cookies.get('checkLogin')?.value;
  const explore = req.cookies.get('explore')?.value;

  // 비정상 상태 : 토큰, 리프레시토큰, 비로그인 상태
  if (!accessToken || !refreshToken || !checkLogin) {
    if (!explore) {
      const res = NextResponse.redirect(new URL('/sign-in', req.url));
      res.cookies.delete(token);
      res.cookies.delete(refresh);
      res.cookies.set('checkLogin', 'false');
      return res;
    }
  }

  // AccessToken이 만료가 되었을 때 재갱신
  if (isTokenExpired(accessToken as string)) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh/token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );
      const newTokenData = await response.json();
      console.log(newTokenData);
      const res = NextResponse.next();
      res.cookies.set(token, newTokenData.accessToken);
      res.cookies.set(refresh, newTokenData.refreshToken);
      res.cookies.set('checkLogin', 'true');
      return res;
    } catch (error) {
      console.error('토큰 재갱신 실패', error);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/studyList/:path*',
    '/search/:path*',
    '/search_result/:path*',
  ],
};
