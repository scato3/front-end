import { create } from "zustand";

interface ISearchResultStore {
  sortSelected: string;
  setSortSelected: (selected: string) => void;
  quickMatch: boolean;
  setQuickMatch: (value: boolean) => void;
}

const useSearchResultStore = create<ISearchResultStore>((set) => ({
  sortSelected: "recent",
  setSortSelected: (selected: string) => set({ sortSelected: selected }),
  quickMatch: false,
  setQuickMatch: (value: boolean) => set({ quickMatch: value }),
}));

export default useSearchResultStore;
