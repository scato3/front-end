import { create } from "zustand";

interface ISideMenuStore {
    selectedInfo: number;
    setSelectedInfo: (selectedInfo: number) => void;
}

const useDetailActiveStore = create<ISideMenuStore>((set) => ({
    selectedInfo: 0,
    setSelectedInfo: (selectedInfo: number) => set({ selectedInfo: selectedInfo }),
}));

export default useDetailActiveStore;
