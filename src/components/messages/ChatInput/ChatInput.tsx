import { TextInput, Pressable } from "react-native";

import { useTheme } from "@/hooks/core";
import { useMessages } from "@/hooks/messages/useMessages";
import { baseStyle } from "@/styles/baseStyle";

import { ThemedText, ThemedView } from "../../core";

export default function ChatInput({ chatID }: { chatID: string }) {
  const theme = useTheme();
  const { newMessage, setNewMessage, addNewMessage } = useMessages();

  return (
    <ThemedView
      style={[
        baseStyle.absolute,
        baseStyle.flexRow,
        baseStyle.itemsCenter,
        { columnGap: 20, bottom: 0 },
      ]}>
      <TextInput
        value={newMessage}
        onChangeText={(text) => setNewMessage(text)}
        placeholderTextColor={theme.text}
        placeholder="text message"
        style={[
          baseStyle.paddingLeftLG,
          baseStyle.marginLeftLG,
          baseStyle.flexGrow,
          baseStyle.roundedLG,
          { backgroundColor: theme.container },
          { color: theme.text },
        ]}
      />
      <Pressable
        onPress={() => addNewMessage(chatID)}
        style={[
          baseStyle.paddingMD,
          baseStyle.marginVerticalSM,
          baseStyle.marginRightLG,
          baseStyle.roundedMD,
          { backgroundColor: theme.container },
        ]}>
        <ThemedText style={baseStyle.fontSM}>Send</ThemedText>
      </Pressable>
    </ThemedView>
  );
}
