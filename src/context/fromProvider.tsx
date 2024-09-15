'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import useFromStore from '@/store/userFrom';

interface PathProviderProps {
  children: ReactNode;
}

const FromProvider = ({ children }: PathProviderProps) => {
  const pathname = usePathname();
  const { setFrom } = useFromStore();
  const previousPath = useRef<string | null>(null); // 이전 경로를 저장할 ref

  useEffect(() => {
    const cleanPathname = pathname.split('?')[0];

    if (previousPath.current) {
      if (previousPath.current === '/studyList') {
        setFrom('/');
      } else {
        setFrom(previousPath.current);
      }
    }

    previousPath.current = cleanPathname;
  }, [pathname]);

  return <>{children}</>;
};

export default FromProvider;
