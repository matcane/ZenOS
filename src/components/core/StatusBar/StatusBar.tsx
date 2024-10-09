import Feather from "@expo/vector-icons/Feather";
import { useSegments } from "expo-router";
import { View } from "react-native";

import { useTheme, useTime } from "@/hooks/core";
import { useThemeStore } from "@/store/core";
import { coreStyles } from "@/styles/core";
import { Colors } from "@/theme";

import ThemedText from "../ThemedText/ThemedText";

const { statusBarContainer, statusBarIcons } = coreStyles;

export default function StatusBar() {
  const { currentTime } = useTime();

  const ICON_SIZE = 20;

  const theme = useTheme();
  const segments = useSegments();
  const statusBarColor = useThemeStore((state) => state.statusBarColor);

  const backgroundColor = segments.length > 0 ? { backgroundColor: statusBarColor } : undefined;
  const color = segments.length > 0 ? theme.text : Colors.dark.text;

  return (
    <View style={[statusBarContainer, backgroundColor]}>
      <ThemedText style={{ color: color }}>{currentTime}</ThemedText>
      <View style={statusBarIcons}>
        <Feather name="wifi" size={ICON_SIZE} color={color} />
        <Feather name="bar-chart" size={ICON_SIZE} color={color} />
        <Feather name="battery" size={ICON_SIZE} color={color} />
      </View>
    </View>
  );
}
