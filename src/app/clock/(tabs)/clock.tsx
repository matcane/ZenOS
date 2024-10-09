import { ThemedText, ThemedView } from "@/components/core";
import { useTime } from "@/hooks/core";
import { baseStyle } from "@/styles/baseStyle";

const { fontSM, fontXL, textCenter, paddingMD, flexGrow } = baseStyle;

export default function Page() {
  const { currentTime, currentDate } = useTime(true);
  return (
    <ThemedView style={[flexGrow, paddingMD]}>
      <ThemedText style={[fontXL, textCenter]}>{currentTime}</ThemedText>
      <ThemedText style={[fontSM, textCenter]}>{currentDate}</ThemedText>
    </ThemedView>
  );
}
