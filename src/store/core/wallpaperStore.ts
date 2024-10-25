import { create } from "zustand";

type TWallpaperStore = {
  isWallpaperHidden: boolean;
  setIsWallpaperHidden: (state: boolean) => void;
};

const initialState = {
  isWallpaperHidden: true,
};

export const useWallpaperStore = create<TWallpaperStore>((set) => ({
  ...initialState,
  setIsWallpaperHidden: (state) => {
    set({ isWallpaperHidden: state });
  },
}));
