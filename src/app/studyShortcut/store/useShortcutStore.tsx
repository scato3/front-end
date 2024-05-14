import { create } from "zustand";

interface IShortcutStore {
  sortSelected: string;
  setSortSelected: (selected: string) => void;
  quickMatch: boolean;
  setQuickMatch: (value: boolean) => void;
}

const useShortcutStore = create<IShortcutStore>((set) => ({
  sortSelected: "recent",
  setSortSelected: (selected: string) => set({ sortSelected: selected }),
  quickMatch: false,
  setQuickMatch: (value: boolean) => set({ quickMatch: value }),
}));

export default useShortcutStore;
