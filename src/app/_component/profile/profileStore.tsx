import { create } from "zustand";
import Default from "../../../../public/Profile.svg";

interface Store {
  postImg: File | null | string;
  previewImg: string | ArrayBuffer | null;
  setPostImg: (postImg: File | string) => void;
  setPreviewImg: (previewImg: string | ArrayBuffer | null) => void;
}

const useStore = create<Store>((set) => ({
  postImg: null,
  previewImg: Default,
  setPostImg: (postImg) => set({ postImg }),
  setPreviewImg: (previewImg) => set({ previewImg }),
}));

export default useStore;
