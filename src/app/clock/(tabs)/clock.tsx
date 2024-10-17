import { SafeArea, ThemedText, ThemedView } from "@/components/core";
import { useDateTimeStore } from "@/store/core/dateTimeStore";
import { baseStyle } from "@/styles/baseStyle";

const { fontSM, fontXL, textCenter, flexGrow } = baseStyle;

export default function Page() {
  const currentTime = useDateTimeStore((state) => state.currentTime);
  const currentDate = useDateTimeStore((state) => state.currentDate);

  return (
    <SafeArea>
      <ThemedView style={[flexGrow]}>
        <ThemedText style={[fontXL, textCenter]}>{currentTime}</ThemedText>
        <ThemedText style={[fontSM, textCenter]}>{currentDate}</ThemedText>
      </ThemedView>
    </SafeArea>
  );
}
