import { create } from "zustand";
import moment from "moment";

const now = moment();

interface IToDoStore {
    selectedDate: string;
    setSelectedDate: (date: string) => void;
    activeMember: Imember | null;
    setActiveMember: (member: Imember) => void;
    watchNickname: string;
    setWatchNickname: (todo: string) => void
    toDo: string;
    setToDo: (nickname: string) => void;
    
}

const useToDoStore = create<IToDoStore>((set) => ({
    selectedDate: now.format('YYYY-MM-DD'),
    setSelectedDate: (date: string) => set({ selectedDate: date }),
    activeMember: null,
    setActiveMember: (member: Imember) => set({ activeMember: member}),
    watchNickname: "",
    setWatchNickname: (nickname: string) => set({watchNickname: nickname}),
    toDo: "",
    setToDo: (content: string) => set({toDo: content}),

}));

export default useToDoStore;
