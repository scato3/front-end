import { create } from "zustand";

interface useFastStore {
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
  selectedField: string | null;
  setSelectedField: (field: string | null) => void;
  selectedDuration: string | null;
  setSelectedDuration: (duration: string | null) => void;
  recruit: number;
  setRecruit: (value: number) => void;
  recruitArr: number[];
  setRecruitArr: (arrUpdater: (prev: number[]) => number[]) => void;
  tendency: string[];
  setTendency: (arrUpdater: (prev: string[]) => string[]) => void;
  matchingType: string | null;
  setMatchingType: (matchingType: string | null) => void;
  fastData: any[] | null;
  setFastData: (data: any[] | null) => void;
}

const useFastStore = create<useFastStore>((set) => ({
  selectedDate: null,
  setSelectedDate: (date: string | null) => set({ selectedDate: date }),
  selectedField: null,
  setSelectedField: (field: string | null) => set({ selectedField: field }),
  selectedDuration: null,
  setSelectedDuration: (duration: string | null) => set({ selectedDuration: duration }),
  recruit: 2,
  setRecruit: (value: number) => set({ recruit: value }),
  recruitArr: [],
  setRecruitArr: (arrUpdater: (prev: number[]) => number[]) => {
    set((state) => ({
      recruitArr: arrUpdater(state.recruitArr),
    }));
  },
  tendency: [],
  setTendency: (arrUpdater: (prev: string[]) => string[]) => {
    set((state) => ({
      tendency: arrUpdater(state.tendency),
    }));
  },
  matchingType: null,
  setMatchingType: (matchingType: string | null) => set({ matchingType: matchingType }),
  fastData: null,
  setFastData: (fastData: any[] | null) => set({ fastData: fastData }),
}));

export default useFastStore;
