'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGetKakaoCode } from '@/apis/login/oauth';
import useAuthStore from '@/store/userauth';
import { setAppCookie, getAppCookie } from '@/utils/cookie';

function LoginComponent() {
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

      if (data.isNewUser) {
        router.push('/setProfile');
      } else {
        router.push('/');
      }
    }
  }, [data]);

  return null;
}

export default function Kakao() {
  return (
    <Suspense>
      <LoginComponent />
    </Suspense>
  );
}
