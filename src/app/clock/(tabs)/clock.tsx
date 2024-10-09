import { View } from "react-native";

import { ThemedText } from "@/components/core";
import { useThemeColor } from "@/hooks/useTheme";
import { useTime } from "@/hooks/useTime";

export default function Page() {
  const theme = useThemeColor();
  const { currentTime, currentDate } = useTime(true);
  return (
    <View style={{ flex: 1, paddingTop: 40, backgroundColor: theme.background }}>
      <ThemedText style={{ fontSize: 64, textAlign: "center" }}>{currentTime}</ThemedText>
      <ThemedText style={{ fontSize: 16, textAlign: "center" }}>{currentDate}</ThemedText>
    </View>
  );
}
