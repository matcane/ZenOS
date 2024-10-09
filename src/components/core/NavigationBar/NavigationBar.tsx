import Feather from "@expo/vector-icons/Feather";
import { router, useSegments } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

import { useThemeColor } from "@/hooks/useTheme";
import useThemeStore from "@/store/themeStore";
import { Colors } from "@/theme";

export default function NavigationBar() {
  const theme = useThemeColor();
  const segments = useSegments();
  const navBarColor = useThemeStore((state) => state.navBarColor);

  const setNavBarColor = useThemeStore((state) => state.setNavBarColor);
  const setStatusBarColor = useThemeStore((state) => state.setStatusBarColor);

  const bg = segments.length > 0 ? { backgroundColor: navBarColor } : undefined;
  const icons = segments.length > 0 ? theme.text : Colors.dark.text;
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
    <View style={[styles.container, bg]}>
      <Feather name="menu" size={16} color={icons} />
      <Pressable
        hitSlop={{
          bottom: 15,
          left: 20,
          right: 20,
          top: 15,
        }}
        disabled={!canBack}
        onPress={homeNavigation}>
        <Feather name="square" size={16} color={icons} />
      </Pressable>
      <Pressable
        hitSlop={{
          bottom: 15,
          left: 20,
          right: 20,
          top: 15,
        }}
        disabled={!canBack}
        onPress={backNavigation}>
        <Feather
          name="triangle"
          style={{ transform: [{ rotate: "30deg" }] }}
          size={16}
          color={icons}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 45,
    gap: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
});
