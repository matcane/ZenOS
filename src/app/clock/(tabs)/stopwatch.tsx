import { ActionButton, SafeArea, ThemedText, ThemedView } from "@/components/core";
import { useTimer } from "@/hooks/core";
import { baseStyle } from "@/styles/baseStyle";
import { clockStyles } from "@/styles/clock";

export default function Page() {
  const { time, timer, isRunning, toggleTimer, resetTimer } = useTimer();

  const primaryIcon = isRunning ? "pause" : "play";

  return (
    <SafeArea>
      <ThemedView style={[baseStyle.flexGrow]}>
        <ThemedText style={[baseStyle.fontXL, baseStyle.textCenter]}>{timer}</ThemedText>
        <ActionButton
          active={true}
          fn={toggleTimer}
          variant="primary"
          iconName={primaryIcon}
          style={clockStyles.stopwatchStartStop}
        />
        <ActionButton
          iconName={"repeat"}
          fn={resetTimer}
          variant="secondary"
          active={time !== 0}
          style={clockStyles.stopwatchReset}
        />
      </ThemedView>
    </SafeArea>
  );
}
