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
  const statusBarColor = useThemeStore((state) => state.statusBarColor);

  const setNavBarColor = useThemeStore((state) => state.setNavBarColor);
  const setStatusBarColor = useThemeStore((state) => state.setStatusBarColor);

  const homeNavigation = () => {
    setStatusBarColor(undefined);
    setNavBarColor(undefined);
    router.replace("");
  };

  const backNavigation = () => {
    if (
      segments.length === 1 ||
      ((segments.length === 3 || segments.length === 2) &&
        segments[1].startsWith("(") &&
        segments[1].endsWith(")"))
    ) {
      setStatusBarColor(undefined);
      setNavBarColor(undefined);
    }
    router.dismiss();
  };

  const handleNavigation = (item: TApp) => {
    const { navigationBar, statusBar } = item;

    const navBarColor =
      navigationBar?.backgroundColor && navigationBar.dark?.backgroundColor
        ? isDark
          ? navigationBar.dark.backgroundColor
          : navigationBar.backgroundColor
        : theme.background;

    const statusBarColor =
      statusBar?.backgroundColor && statusBar.dark?.backgroundColor
        ? isDark
          ? statusBar.dark.backgroundColor
          : statusBar.backgroundColor
        : theme.background;

    setNavBarColor(navBarColor);
    setStatusBarColor(statusBarColor);

    router.navigate(item.slug);
  };

  return { isRoot, navBarColor, statusBarColor, homeNavigation, backNavigation, handleNavigation };
}
