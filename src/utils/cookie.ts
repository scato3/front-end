import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';

const isProduction = process.env.NODE_ENV === 'production';

// 쿠키 설정
export const setAppCookie = (name: string, value: string, options?: any) => {
  setCookie(name, value, {
    path: '/',
    secure: isProduction,
    httpOnly: false,
    ...options,
  });
};

// 쿠키 반환 (서버 사이드)
export const getAppCookie = (
  name: string,
  req?: NextApiRequest,
  res?: NextApiResponse
) => {
  return getCookie(name, { req, res });
};

// 쿠키 삭제
export const removeCookie = (name: string) => {
  deleteCookie(name, { path: '/' });
};
