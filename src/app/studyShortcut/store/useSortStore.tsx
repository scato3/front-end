import { create } from "zustand";

interface SortStore {
  sortSelected: string;
  setSortSelected: (selected: string) => void;
  quickMatch: boolean;
  setQuickMatch: (value: boolean) => void;
}

const useSortStore = create<SortStore>((set) => ({
  sortSelected: "recent",
  setSortSelected: (selected: string) => set({ sortSelected: selected }),
  quickMatch: false,
  setQuickMatch: (value: boolean) => set({ quickMatch: value }),
}));

export default useSortStore;
