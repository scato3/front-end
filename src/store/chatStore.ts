import { create } from 'zustand';

interface ChatStore {
  searchResults: number[];
  currentSearchIndex: number;
  setSearchResults: (results: number[]) => void;
  setCurrentSearchIndex: (index: number) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  searchResults: [],
  currentSearchIndex: 0,
  setSearchResults: (results) => set({ searchResults: results }),
  setCurrentSearchIndex: (index) => set({ currentSearchIndex: index }),
}));
