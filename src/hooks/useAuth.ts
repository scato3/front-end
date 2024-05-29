import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface IUserState {
  accessToken: string;
  email: string;
  joinDate: string;
  nickname: string;
  userId: number;
  userObjectId: string;
}
interface GlobalState {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
  user: null | IUserState;
  setUser: (user: IUserState | null) => void;
  logout: () => void;
}

const initialState: GlobalState = {
  isLogin: false,
  setIsLogin: () => {},
  accessToken: "",
  setAccessToken: () => {},
  user: null,
  setUser: () => {},
  logout: () => {},
};

const useAuth = create<GlobalState>(
  persist(
    (set) => ({
      ...initialState,
      setUser: (user: IUserState) => set({ user }),
      setIsLogin: (isLogin: boolean) => set({ isLogin }),
      setAccessToken: (accessToken: string) => set({ accessToken }),
      logout: () => {
        set({
          isLogin: false,
          accessToken: "",
          user: null,
        });
        localStorage.removeItem("userToken");
      },
    }),
    {
      name: "userToken",
      storage: createJSONStorage(() => localStorage),
    },
  ) as any,
);

export default useAuth;
