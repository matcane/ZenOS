import useThemeStore from "@/store/themeStore";
import { Colors } from "@/theme";

export function useThemeColor() {
  const isDark = useThemeStore((state) => state.isDark);

  if (isDark) {
    return Colors.dark;
  } else {
    return Colors.light;
  }
}
