'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getAppCookie } from '@/utils/cookie';
import { useAlert } from './alertProvider';

const ALLOWED_ROUTES = [
  '/',
  '/search',
  '/search_result',
  '/studyList',
  '/fastMatching',
  '/profile',
];

export default function TourProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { showAlert } = useAlert();

  useEffect(() => {
    const isExplore = getAppCookie('explore') === 'true';

    if (isExplore && !ALLOWED_ROUTES.includes(pathname)) {
      showAlert('로그인이 필요한 페이지에요');
    }
  }, [pathname]);

  return <>{children}</>;
}
