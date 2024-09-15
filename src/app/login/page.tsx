'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGetKakaoCode } from '@/apis/login/oauth';
import useAuthStore from '@/store/userauth';
import { setAppCookie, getAppCookie } from '@/utils/cookie';

export default function Kakao() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const { setCheckLogin } = useAuthStore();
  const router = useRouter();

  const { data } = useGetKakaoCode({ code });

  useEffect(() => {
    const refreshTokenInCookie = getAppCookie(
      process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY as string
    );

    if (data && !refreshTokenInCookie) {
      setAppCookie(
        process.env.NEXT_PUBLIC_COOKIE_TOKEN_KEY as string,
        data.accessToken
      );
      setAppCookie(
        process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY as string,
        data.refreshToken
      );
      setCheckLogin(true);
      data.isNewUser ? router.push('/') : router.push('/setProfile');
    }
  }, [data, router, setCheckLogin]);
}
