import { create } from 'zustand';

interface PathStore {
  from: string | null;
  setFrom: (path: string) => void;
}

const useFromStore = create<PathStore>((set) => ({
  from: null,
  setFrom: (path: string) => set({ from: path }),
}));

export default useFromStore;
