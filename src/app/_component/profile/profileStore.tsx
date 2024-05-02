import {create} from "zustand";
import defaultImage from '../../../../public/Profile.svg';

interface Store {
    postImg: File[];
    previewImg: string | ArrayBuffer | null;
    setPostImg: (postImg: File[]) => void;
    setPreviewImg: (previewImg: string | ArrayBuffer | null) => void;
}

const useStore = create<Store>((set) => ({
    postImg: [],
    previewImg:  defaultImage,
    setPostImg: (postImg) => set({ postImg }),
    setPreviewImg: (previewImg) => set({ previewImg }),
}))

export default useStore;