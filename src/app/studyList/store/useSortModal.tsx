import { create } from "zustand";

interface SortStore {
  sortSelected: string | null;
  setSortSelected: (selected: string | null) => void;
}

const useSortStore = create<SortStore>((set) => ({
  sortSelected: "recent",
  setSortSelected: (selected: string | null) => set({ sortSelected: selected }),
}));

export default useSortStore;
