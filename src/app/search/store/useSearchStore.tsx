import { create } from "zustand";

interface recent {
  id: number;
  keyword: string;
}

interface IsearchStore {
  queryString: string;
  setQueryString: (query: string) => void;
  recentKeywords: recent[];
  setRecentKeywords: (keyword: recent[]) => void;
  addRecentKeyword: (keyword: recent) => void;
  type: string;
  setType: (t: string) => void;
}

const useSearchStore = create<IsearchStore>((set) => ({
  queryString: "",
  setQueryString: (query: string) => set({queryString: query}),
  recentKeywords: [],
  setRecentKeywords: (keyword: recent[]) => set({recentKeywords: keyword}),
  addRecentKeyword: (keyword: recent) =>
    set((state) => ({
      recentKeywords: [...state.recentKeywords, keyword],
    })),
  type: "recent",
  setType: (t: string) => set({type: t})
}));

export default useSearchStore;
