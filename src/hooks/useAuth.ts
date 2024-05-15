import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUserState {
  accessToken: string;
  email: string;
  joinDate: string;
  nickname: string;
  userId: number;
  userObjectId: string
}
interface GlobalState {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
  user: null | IUserState;
  setUser: (user: IUserState) => void;
}

const initialState: GlobalState = {
  isLogin: false,
  setIsLogin: () => {},
  accessToken: "",
  setAccessToken: () => {},
  user: null,
  setUser: () => {},
};

const useAuth = create<GlobalState>(
  persist(
    (set) => ({
      ...initialState,
      setUser: (user: IUserState) => set({ user }),
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
