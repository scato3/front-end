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
  inputValue: string;
  setInputValue: (input: string) => void;
}

const useSearchStore = create<IsearchStore>((set) => ({
  queryString: "",
  setQueryString: (query: string) => set({queryString: query}),
  recentKeywords: [],
  setRecentKeywords: (keyword: recent[]) => set({recentKeywords: keyword}),
  addRecentKeyword: (keyword: recent) =>
    set((state) => {
      const updatedKeywords = [
        keyword,
        ...state.recentKeywords.filter((k) => k.keyword !== keyword.keyword),
      ];

      if (updatedKeywords.length > 10) {
        updatedKeywords.pop();
      }

      return { recentKeywords: updatedKeywords };
    }),
  type: "recent",
  setType: (t: string) => set({type: t}),
  inputValue: "",
  setInputValue: (input: string) => set({inputValue: input})
}));

export default useSearchStore;
