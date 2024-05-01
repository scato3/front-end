import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface GlobalState {
  setUserData: (token: string | null, isLogin: boolean) => void;
}

const initialState: GlobalState = {
  setUserData: () => {},
};

const useAuth = create<GlobalState>(
  persist(
    (set) => ({
      ...initialState,
      setUserData: (accessToken: string | null, isLogin: boolean) => set({ accessToken, isLogin }),
    }),
    {
      name: "userToken",
      storage: createJSONStorage(() => localStorage),
    },
  ) as any,
);

export default useAuth;
