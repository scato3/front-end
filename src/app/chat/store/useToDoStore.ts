import { create } from "zustand";

interface IToDoStore {
    selectedDate: string | null;
    setSelectedDate: (date: string | null) => void;
    activeMember: Imember | null;
    setActiveMember: (member: Imember) => void;
}

const useToDoStore = create<IToDoStore>((set) => ({
    selectedDate: null,
    setSelectedDate: (date: string | null) => set({ selectedDate: date }),
    activeMember: null,
    setActiveMember: (member: Imember) => set({ activeMember: member}),
    

}));

export default useToDoStore;
