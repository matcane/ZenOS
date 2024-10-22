import { SafeArea, ThemedText, ThemedView } from "@/components/core";
import { useDateTimeStore } from "@/store/core/dateTimeStore";
import { baseStyle } from "@/styles/baseStyle";

export default function Page() {
  const currentTime = useDateTimeStore((state) => state.currentTime);
  const currentDate = useDateTimeStore((state) => state.currentDate);

  return (
    <SafeArea>
      <ThemedView style={[baseStyle.flexGrow]}>
        <ThemedText style={[baseStyle.fontXL, baseStyle.textCenter]}>{currentTime}</ThemedText>
        <ThemedText style={[baseStyle.fontSM, baseStyle.textCenter]}>{currentDate}</ThemedText>
      </ThemedView>
    </SafeArea>
  );
}
