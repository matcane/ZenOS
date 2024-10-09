import Feather from "@expo/vector-icons/Feather";
import { router, useSegments } from "expo-router";
import { Pressable, View } from "react-native";

import { useTheme } from "@/hooks/core";
import { useThemeStore } from "@/store/core";
import { baseStyle } from "@/styles/baseStyle";
import { coreStyles } from "@/styles/core";
import { Colors } from "@/theme";

const { sizeSM } = baseStyle;
const { navigationBarContainer, backNavButton } = coreStyles;

export default function NavigationBar() {
  const theme = useTheme();
  const segments = useSegments();
  const navBarColor = useThemeStore((state) => state.navBarColor);

  const setNavBarColor = useThemeStore((state) => state.setNavBarColor);
  const setStatusBarColor = useThemeStore((state) => state.setStatusBarColor);

  const iconSize = sizeSM.height;
  const backgroundColor = segments.length > 0 ? { backgroundColor: navBarColor } : undefined;
  const navBarButtonHitSlop = {
    bottom: 15,
    left: 20,
    right: 20,
    top: 15,
  };
  const color = segments.length > 0 ? theme.text : Colors.dark.text;
  const canBack = segments.length > 0;

  const homeNavigation = () => {
    setStatusBarColor(undefined);
    setNavBarColor(undefined);
    router.replace("");
  };

  const backNavigation = () => {
    router.back();
  };

  return (
    <View style={[navigationBarContainer, backgroundColor]}>
      <Feather name="menu" size={iconSize} color={color} />

      <Pressable hitSlop={navBarButtonHitSlop} disabled={!canBack} onPress={homeNavigation}>
        <Feather name="square" size={iconSize} color={color} />
      </Pressable>

      <Pressable hitSlop={navBarButtonHitSlop} disabled={!canBack} onPress={backNavigation}>
        <Feather name="triangle" style={backNavButton} size={iconSize} color={color} />
      </Pressable>
    </View>
  );
}
