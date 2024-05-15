import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IFromProps {
  from: string;
  setFrom: (From: string) => void;
}

const useFromStore = create<IFromProps>(
  persist(
    (set) => ({
      from: "home",
      setFrom: (From: string) => set({ from: From }),
    }),
    {
      name: "from-storage",
      getStorage: () => localStorage,
    },
  ) as any,
);

export default useFromStore;
