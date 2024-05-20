import { create } from "zustand";

interface IMemberStore {
    outMemberName: string;
    setOutMemberName: (name: string) => void;
    outUserId: number;
    setOutUserId: (id: number) => void;
    reqUserId: number;
    setReqUserId: (id: number) => void;
    exitReasons: string[];
    setExitReasons: (reasons: string[]) => void;
    startDate: string;
    setStartDate: (date: string) => void;
    isQuick: boolean;
    setIsQuick: (quick: boolean) => void;
}

const useMemberStore = create<IMemberStore>((set) => ({
    outMemberName: "",
    setOutMemberName: (name: string) => set({outMemberName: name}),
    outUserId: -1,
    setOutUserId: (id: number) => set({ outUserId: id }),
    reqUserId: -1,
    setReqUserId: (id: number) => set({ reqUserId: id }),
    exitReasons: [],
    setExitReasons: (reasons: string[]) => set({ exitReasons: reasons }),
    startDate: "",
    setStartDate: (date:string) => set({ startDate: date}),
    isQuick: false,
    setIsQuick: (quick: boolean) => set({ isQuick: quick }),
}));

export default useMemberStore;
