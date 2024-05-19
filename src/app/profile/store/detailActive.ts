import { create } from "zustand";

interface ISearchResultStore {
  selectedInfo: number;
  setSelectedInfo: (selectedInfo: number) => void;
}

const useDetailActiveStore = create<ISearchResultStore>((set) => ({
  selectedInfo: 0,
  setSelectedInfo: (selectedInfo: number) => set({ selectedInfo: selectedInfo }),
}));

export default useDetailActiveStore;
