import Feather from "@expo/vector-icons/Feather";
import { useSegments } from "expo-router";
import { StyleSheet, View } from "react-native";

import { useThemeColor } from "@/hooks/useTheme";
import { useTime } from "@/hooks/useTime";
import useThemeStore from "@/store/themeStore";
import { Colors } from "@/theme";

import ThemedText from "../ThemedText/ThemedText";

export default function StatusBar() {
  const { currentTime } = useTime();

  const theme = useThemeColor();
  const segments = useSegments();
  const statusBarColor = useThemeStore((state) => state.statusBarColor);

  const bg = segments.length > 0 ? { backgroundColor: statusBarColor } : undefined;
  const icons = segments.length > 0 ? theme.text : Colors.dark.text;
  return (
    <View style={[styles.container, bg]}>
      <ThemedText style={{ color: icons }}>{currentTime}</ThemedText>
      <View style={styles.icons}>
        <Feather name="wifi" size={20} color={icons} />
        <Feather name="bar-chart" size={20} color={icons} />
        <Feather name="battery" size={20} color={icons} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    height: 20,
    paddingHorizontal: 18,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  icons: {
    gap: 2,
    flexDirection: "row",
  },
});
