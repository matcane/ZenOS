import Feather from "@expo/vector-icons/Feather";
import { useSegments } from "expo-router";
import { View } from "react-native";

import { useTheme } from "@/hooks/core";
import { useThemeStore } from "@/store/core";
import { useDateTimeStore } from "@/store/core/dateTimeStore";
import { coreStyles } from "@/styles/core";
import { Colors } from "@/theme";

import ThemedText from "../ThemedText/ThemedText";

const { statusBarContainer, statusBarIcons } = coreStyles;

export default function StatusBar() {
  const currentTime = useDateTimeStore((state) => state.currentTime);

  const ICON_SIZE = 16;

  const theme = useTheme();
  const segments = useSegments();
  const statusBarColor = useThemeStore((state) => state.statusBarColor);

  let backgroundColor = segments.length > 0 ? { backgroundColor: statusBarColor } : undefined;
  let color;

  if (segments.length === 0) color = Colors.dark.text;
  if (segments.length > 0) color = theme.text;
  if (segments[0] === "camera" && segments.length === 1) color = Colors.dark.background;
  if (segments[0] === "camera" && segments.length === 3) color = Colors.dark.text;
  if (segments[0] === "sign-in" || segments[0] === "sign-up") {
    color = theme.background;
    backgroundColor = { backgroundColor: theme.background };
  }

  return (
    <View style={[statusBarContainer, backgroundColor]}>
      <ThemedText style={{ color: color }}>{currentTime.slice(0, 5)}</ThemedText>
      <View style={statusBarIcons}>
        <Feather name="wifi" size={ICON_SIZE} color={color} />
        <Feather name="bar-chart" size={ICON_SIZE} color={color} />
        <Feather name="battery" size={ICON_SIZE} color={color} />
      </View>
    </View>
  );
}
