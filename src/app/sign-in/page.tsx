'use client';

import Landing from '@/component/login/Landing';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './sign-in.module.scss';
import { getAppCookie } from '@/utils/cookie';

export default function SignIn() {
  const token = getAppCookie(process.env.NEXT_PUBLIC_COOKIE_TOKEN_KEY ?? '');
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.replace('/');
    }
  }, [token, router]);

  return (
    <div className={styles.Container}>
      <Landing />
    </div>
  );
}
