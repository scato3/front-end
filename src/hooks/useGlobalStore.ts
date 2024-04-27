import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GlobalState {
  isLogin: boolean;
  token: string | null;
  setIsLogin: (isLogin: boolean) => void;
  setToken: (token: string | null) => void;
}

const initialState: GlobalState = {
  isLogin: false,
  token: null,
  setIsLogin: () => {},
  setToken: () => {},
};

const useGlobalStore = create<GlobalState>(
  persist(
    (set) => ({
      ...initialState,
      setIsLogin: (isLogin: boolean) => set({ isLogin }),
      setToken: (token: string) => set({ token }),
    }),
    {
      name: "globalState",
      getStorage: () => localStorage,
    },
  ) as any,
);

export default useGlobalStore;
