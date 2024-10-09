import { create } from "zustand";

import { storage } from "@/MMKV";

const OSThemeDark = storage.getString("OSThemeDark");
const isThemeDark = OSThemeDark === "true" ? true : false;

type TExerciseStore = {
  isDark: boolean;
  statusBarColor: string | undefined;
  navBarColor: string | undefined;
  toggleMode: (colors: {
    light: {
      text: string;
      container: string;
      background: string;
    };
    dark: {
      text: string;
      container: string;
      background: string;
    };
  }) => void;
  setStatusBarColor: (color: string | undefined) => void;
  setNavBarColor: (color: string | undefined) => void;
};

const initialState = {
  isDark: isThemeDark,
  statusBarColor: undefined,
  navBarColor: undefined,
};

export const useThemeStore = create<TExerciseStore>((set) => ({
  ...initialState,
  toggleMode: (colors) => {
    const prevIsDark = useThemeStore.getState().isDark;
    const newIsDark = !prevIsDark;
    const newColor = newIsDark ? colors.dark.background : colors.light.background;
    set({
      isDark: newIsDark,
      statusBarColor: newColor,
      navBarColor: newColor,
    });
    storage.set("OSThemeDark", JSON.stringify(newIsDark));
  },
  setStatusBarColor: (color) => {
    set({ statusBarColor: color });
  },
  setNavBarColor: (color) => {
    set({ navBarColor: color });
  },
}));
