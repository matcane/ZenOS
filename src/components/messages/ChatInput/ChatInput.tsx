import { TextInput, Pressable } from "react-native";

import { useTheme } from "@/hooks/core";
import { useMessages } from "@/hooks/messages/useMessages";
import { baseStyle } from "@/styles/baseStyle";
import { messagesStyles } from "@/styles/messages";

import { ThemedText, ThemedView } from "../../core";

export default function ChatInput({ chatID }: { chatID: string }) {
  const theme = useTheme();
  const { newMessage, setNewMessage, addNewMessage } = useMessages();

  return (
    <ThemedView style={messagesStyles.chatInputContainer}>
      <TextInput
        value={newMessage}
        onChangeText={(text) => setNewMessage(text)}
        placeholderTextColor={theme.text}
        placeholder="text message"
        style={[
          messagesStyles.chatInput,
          { backgroundColor: theme.container },
          { color: theme.text },
        ]}
      />
      <Pressable
        onPress={() => addNewMessage(chatID)}
        style={[messagesStyles.chatInputButton, { backgroundColor: theme.container }]}>
        <ThemedText style={baseStyle.fontSM}>Send</ThemedText>
      </Pressable>
    </ThemedView>
  );
}
