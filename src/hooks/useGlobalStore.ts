import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GlobalState {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

const initialState: GlobalState = {
  isLogin: false,
  setIsLogin: () => {},
};

const useGlobalStore = create<GlobalState>(
  persist(
    (set) => ({
      ...initialState,
      setIsLogin: (isLogin: boolean) => set({ isLogin }),
    }),
    {
      name: "globalState",
      getStorage: () => localStorage,
    },
  ) as any,
);

export default useGlobalStore;
