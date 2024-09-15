import { getAppCookie, setAppCookie } from "../utils/cookie";
import { create } from "zustand";

interface AuthState {
  checkLogin: boolean;
  setCheckLogin: (value: boolean) => void;
}

const COOKIE_NAME = "checkLogin";

// 쿠키에서 초기 로그인 상태를 가져오는 함수
const getInitialLoginState = (): boolean => {
  const cookieValue = getAppCookie(COOKIE_NAME);
  return cookieValue === "true";
};

const useAuthStore = create<AuthState>((set) => ({
  checkLogin: getInitialLoginState(),
  setCheckLogin: (value: boolean) => {
    setAppCookie(COOKIE_NAME, String(value)); // 쿠키에 로그인 상태 저장
    set({ checkLogin: value });
  },
}));

export default useAuthStore;
