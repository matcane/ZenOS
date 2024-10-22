import { ThemedText, ThemedView } from "@/components/core";
import { useTheme } from "@/hooks/core";
import { TMessage, useMessages } from "@/hooks/messages/useMessages";
import { baseStyle } from "@/styles/baseStyle";
import { messagesStyles } from "@/styles/messages";

export default function ChatMessage({ item }: { item: TMessage }) {
  const theme = useTheme();
  const { currentPhoneNumber } = useMessages();
  return (
    <ThemedView
      style={[
        baseStyle.paddingSM,
        currentPhoneNumber === item.author ? baseStyle.itemsEnd : baseStyle.itemsStart,
      ]}>
      <ThemedText
        style={[
          messagesStyles.chatMessage,
          currentPhoneNumber === item.author
            ? { backgroundColor: theme.primary }
            : { backgroundColor: theme.container },
        ]}>
        {item.message}
      </ThemedText>
      <ThemedText style={[baseStyle.fontXS]}>
        {item.creation_date.toDate().toTimeString().slice(0, 5)}
      </ThemedText>
    </ThemedView>
  );
}
