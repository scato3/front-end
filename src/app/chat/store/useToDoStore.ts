import { create } from "zustand";

interface IToDoStore {
    selectedDate: string | null;
    setSelectedDate: (date: string | null) => void;
}

const useToDoStore = create<IToDoStore>((set) => ({
    selectedDate: null,
    setSelectedDate: (date: string | null) => set({ selectedDate: date }),
}));

export default useToDoStore;
