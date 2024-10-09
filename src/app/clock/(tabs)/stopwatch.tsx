import { View } from "react-native";

import { ActionButton, ThemedText } from "@/components/core";
import { useThemeColor } from "@/hooks/useTheme";
import { useTimer } from "@/hooks/useTimer";

export default function Page() {
  const theme = useThemeColor();
  const { time, timer, isRunning, toggleTimer, resetTimer } = useTimer();

  const primaryIcon = isRunning ? "pause" : "play";

  return (
    <View style={{ flex: 1, paddingTop: 40, backgroundColor: theme.background }}>
      <ThemedText style={{ fontSize: 64, textAlign: "center", flex: 1 }}>{timer}</ThemedText>
      <ActionButton
        active={true}
        style={{ right: "50%", marginRight: -30, bottom: 0, marginBottom: 30 }}
        icon={primaryIcon}
        type="primary"
        fn={toggleTimer}
      />
      <ActionButton
        active={time !== 0}
        style={{ right: "25%", marginRight: -20, bottom: 0, marginBottom: 35 }}
        icon={"repeat"}
        type="secondary"
        fn={resetTimer}
      />
    </View>
  );
}
