import { Pressable } from "react-native";

import { ThemedText, ThemedView } from "@/components/core";
import { useTheme } from "@/hooks/core";
import { useAuthStore } from "@/store/core";
import { baseStyle } from "@/styles/baseStyle";
import { coreStyles } from "@/styles/core";

const { firstSettingsFieldItem, lastSettingsFieldItem } = coreStyles;

const { flexGrow, paddingLG, justifyBetween, flexRow, paddingMD } = baseStyle;

export default function Phone() {
  const theme = useTheme();
  const containerStyles = [
    { backgroundColor: theme.container },
    flexRow,
    paddingMD,
    justifyBetween,
    firstSettingsFieldItem,
    lastSettingsFieldItem,
  ];

  const phoneNumber = useAuthStore((state) => state.phoneNumber);

  return (
    <ThemedView style={[flexGrow, paddingLG]}>
      <Pressable style={containerStyles}>
        <ThemedText>Phone Number</ThemedText>
        <ThemedText>{phoneNumber}</ThemedText>
      </Pressable>
    </ThemedView>
  );
}
