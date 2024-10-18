import { router, useSegments } from "expo-router";

import { TApp } from "@/constants/core";
import { useThemeStore } from "@/store/core";

import { useTheme } from "./useTheme";

export function useNav() {
  const theme = useTheme();
  const segments = useSegments();
  const isRoot = segments.length === 0;

  const isDark = useThemeStore((state) => state.isDark);
  const navBarColor = useThemeStore((state) => state.navBarColor);

  const setNavBarColor = useThemeStore((state) => state.setNavBarColor);
  const setStatusBarColor = useThemeStore((state) => state.setStatusBarColor);

  const homeNavigation = () => {
    setStatusBarColor(undefined);
    setNavBarColor(undefined);
    router.replace("");
  };

  const backNavigation = () => {
    router.dismiss();
  };

  const handleNavigation = (item: TApp) => {
    const { navigationBar } = item;

    const navBarColor =
      navigationBar?.backgroundColor && navigationBar.dark?.backgroundColor
        ? isDark
          ? navigationBar.dark.backgroundColor
          : navigationBar.backgroundColor
        : theme.background;

    setNavBarColor(navBarColor);
    setStatusBarColor(theme.background);

    router.navigate(item.slug);
  };

  return { isRoot, navBarColor, homeNavigation, backNavigation, handleNavigation };
}
