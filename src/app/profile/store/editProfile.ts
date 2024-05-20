import { create } from "zustand";

interface Store {
    postImg: File | null | string;
    previewImg: string | ArrayBuffer | null;
    setPostImg: (postImg: File | string) => void;
    setPreviewImg: (previewImg: string | ArrayBuffer | null) => void;
}

const useEditProfileStore = create<Store>((set) => ({
    postImg: null,
    previewImg: null,
    setPostImg: (postImg) => set({ postImg }),
    setPreviewImg: (previewImg) => set({ previewImg }),
}));

export default useEditProfileStore;
