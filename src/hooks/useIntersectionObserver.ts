import { useEffect } from 'react';

export const useIntersectionObserver = (
  ref: React.RefObject<HTMLDivElement>,
  callback: () => void,
  options?: IntersectionObserverInit
) => {
  useEffect(() => {
    if (!ref.current) return; // ref가 null인 경우 방지

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        console.log('Intersection observed:', ref.current); // Observer 트리거 확인
        callback();
      }
    }, options);

    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, callback, options]);
};
