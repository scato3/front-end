import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface GlobalState {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
}

const initialState: GlobalState = {
  isLogin: false,
  setIsLogin: () => {},
  accessToken: "",
  setAccessToken: () => {},
};

const useAuth = create<GlobalState>(
  persist(
    (set) => ({
      ...initialState,
      setIsLogin: (isLogin: boolean) => set({ isLogin }),
      setAccessToken: (accessToken: string) => set({ accessToken }),
    }),
    {
      name: "userToken",
      storage: createJSONStorage(() => localStorage),
    },
  ) as any,
);

export default useAuth;
