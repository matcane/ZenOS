import { Pressable } from "react-native";

import { ThemedText, ThemedView } from "@/components/core";
import { useTheme } from "@/hooks/core";
import { useAuthStore } from "@/store/core";
import { baseStyle } from "@/styles/baseStyle";
import { settingsStyles } from "@/styles/settings";

export default function Phone() {
  const theme = useTheme();
  const containerStyles = [
    { backgroundColor: theme.container },
    baseStyle.flexRow,
    baseStyle.paddingMD,
    baseStyle.justifyBetween,
    settingsStyles.firstSettingsFieldItem,
    settingsStyles.lastSettingsFieldItem,
  ];

  const phoneNumber = useAuthStore((state) => state.phoneNumber);

  return (
    <ThemedView style={[baseStyle.flexGrow, baseStyle.paddingLG]}>
      <Pressable style={containerStyles}>
        <ThemedText>Phone Number</ThemedText>
        <ThemedText>{phoneNumber}</ThemedText>
      </Pressable>
    </ThemedView>
  );
}
