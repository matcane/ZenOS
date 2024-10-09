import { ActionButton, ThemedText, ThemedView } from "@/components/core";
import { useTimer } from "@/hooks/core";
import { baseStyle } from "@/styles/baseStyle";
import { coreStyles } from "@/styles/core";

const { paddingTopXXL, fontXL, textCenter, flexGrow } = baseStyle;
const { stopwatchStartStop, stopwatchReset } = coreStyles;

export default function Page() {
  const { time, timer, isRunning, toggleTimer, resetTimer } = useTimer();

  const primaryIcon = isRunning ? "pause" : "play";

  return (
    <ThemedView style={[flexGrow, paddingTopXXL]}>
      <ThemedText style={[fontXL, textCenter]}>{timer}</ThemedText>
      <ActionButton
        active={true}
        fn={toggleTimer}
        variant="primary"
        iconName={primaryIcon}
        style={stopwatchStartStop}
      />
      <ActionButton
        iconName={"repeat"}
        fn={resetTimer}
        variant="secondary"
        active={time !== 0}
        style={stopwatchReset}
      />
    </ThemedView>
  );
}
