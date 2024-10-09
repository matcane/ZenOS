import { useThemeStore } from "@/store/core";
import { Colors } from "@/theme";

export function useTheme() {
  const isDark = useThemeStore((state) => state.isDark);

  if (isDark) {
    return Colors.dark;
  } else {
    return Colors.light;
  }
}
