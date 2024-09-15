import { create } from 'zustand';
import { setAppCookie } from '../utils/cookie';

interface ExploreState {
  explore: boolean;
  setExplore: (value: boolean) => void;
}

const COOKIE_NAME = 'explore';

const useExploreStore = create<ExploreState>((set) => ({
  explore: false,
  setExplore: (value: boolean) => {
    setAppCookie(COOKIE_NAME, value ? 'true' : 'false');
    set({ explore: value });
  },
}));

export default useExploreStore;
