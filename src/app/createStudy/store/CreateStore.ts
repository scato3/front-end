import { create } from "zustand";

interface CreateStore {
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
  selectedField: string | null;
  setSelectedField: (field: string | null) => void;
  selectedDuration: string | null;
  setSelectedDuration: (duration: string | null) => void;
  recruit: number;
  setRecruit: (value: number) => void;
}

const CreateStore = create<CreateStore>((set) => ({
  selectedDate: null,
  setSelectedDate: (date: string | null) => set({ selectedDate: date }),
  selectedField: null,
  setSelectedField: (field: string | null) => set({ selectedField: field }),
  selectedDuration: null,
  setSelectedDuration: (duration: string | null) => set({ selectedDuration: duration }),
  recruit: 2,
  setRecruit: (value: number) => set({ recruit: value }),
}));

export default CreateStore;
