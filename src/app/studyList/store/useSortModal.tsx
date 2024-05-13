import { create } from "zustand";

interface SortStore {
  sortSelected: string;
  setSortSelected: (selected: string) => void;
}

const useSortStore = create<SortStore>((set) => ({
  sortSelected: "recent",
  setSortSelected: (selected: string) => set({ sortSelected: selected }),
}));

export default useSortStore;
