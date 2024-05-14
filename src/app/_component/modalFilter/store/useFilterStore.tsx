import { create } from "zustand";

interface FilterStore {
  selectedArea: string | null;
  setSelectedArea: (area: string | null) => void;
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
  selectedDuration: string | null;
  setSelectedDuration: (duration: string | null) => void;
  minCount: string;
  setMinCount: (count: string) => void;
  maxCount: string;
  setMaxCount: (count: string) => void;
  selectedTendency: Tendency[];
  setSelectedTendency: (tendency: Tendency[]) => void;
}

interface Tendency {
  value: string;
  name: string;
}

const useFilterStore = create<FilterStore>((set) => ({
  selectedArea: null,
  setSelectedArea: (area: string | null) => set({ selectedArea: area }),
  selectedDate: null,
  setSelectedDate: (date: string | null) => set({ selectedDate: date }),
  selectedDuration: null,
  setSelectedDuration: (duration: string | null) => set({ selectedDuration: duration }),
  minCount: "",
  setMinCount: (count: string) => set({ minCount: count }),
  maxCount: "",
  setMaxCount: (count: string) => set({ maxCount: count }),
  selectedTendency: [],
  setSelectedTendency: (tendency: Tendency[]) => set({ selectedTendency: tendency }),
}));

export default useFilterStore;
