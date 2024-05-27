import { create } from "zustand";

interface IMemberStore {
    outMemberName: string;
    setOutMemberName: (name: string) => void;
    outUserId: number;
    setOutUserId: (id: number) => void;
    acceptUserId: number;
    setAcceptUserId: (id: number) => void;
    declineUserId: number;
    setDeclineUserId: (id: number) => void;
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
    acceptUserId: -1,
    setAcceptUserId: (id: number) => set({ acceptUserId: id }),
    declineUserId: -1,
    setDeclineUserId: (id: number) => set({ declineUserId: id }),
    exitReasons: [],
    setExitReasons: (reasons: string[]) => set({ exitReasons: reasons }),
    startDate: "",
    setStartDate: (date:string) => set({ startDate: date}),
    isQuick: false,
    setIsQuick: (quick: boolean) => set({ isQuick: quick }),
}));

export default useMemberStore;
