import { create } from "zustand";

interface IMemberStore {
    outMemberName: string;
    setOutMemberName: (name: string) => void;
    outUserId: number;
    setOutUserId: (id: number) => void;
    exitReasons: string[];
    setExitReasons: (reasons: string[]) => void;

}

const useMemberStore = create<IMemberStore>((set) => ({
    outMemberName: "",
    setOutMemberName: (name: string) => set({outMemberName: name}),
    outUserId: -1,
    setOutUserId: (id: number) => set({ outUserId: id }),
    exitReasons: [],
    setExitReasons: (reasons: string[]) => set({ exitReasons: reasons }),
}));

export default useMemberStore;
