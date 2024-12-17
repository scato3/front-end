import { useEffect, useRef } from 'react';

export const useIntersectionObserver = (
  callback: () => void,
  options?: IntersectionObserverInit
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const observe = (element: HTMLElement | null) => {
    if (observerRef.current) observerRef.current.disconnect(); // 기존 observer 해제
    if (element) {
      observerRef.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      }, options);
      observerRef.current.observe(element);
    }
  };

  useEffect(() => {
    return () => observerRef.current?.disconnect(); // 컴포넌트 unmount 시 observer 해제
  }, []);

  return { observe };
};
