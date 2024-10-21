import AntDesign from "@expo/vector-icons/AntDesign";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { KeyboardAvoidingView, Pressable } from "react-native";

import { ThemedView } from "@/components/core";
import { ChatMessageList, ChatInput } from "@/components/messages";
import { useTheme } from "@/hooks/core";
import { useMessages } from "@/hooks/messages";
import { useHiddenNumbersStore } from "@/store/messages";
import { baseStyle } from "@/styles/baseStyle";

export default function ConversationModal() {
  const theme = useTheme();
  const { slug } = useLocalSearchParams();
  const { messagesList, currentPhoneNumber } = useMessages();
  const { addHiddenNumber } = useHiddenNumbersStore();

  const currentConversationID = Array.isArray(slug) ? slug[0] : slug;

  const chat = messagesList.find((chat) => chat.docID === slug);
  const chatHistory = chat?.data.history;

  const headerTitle = chat?.data.chat_members
    .filter((member: string) => member !== currentPhoneNumber)
    .at(0);

  const hideChat = () => {
    addHiddenNumber(headerTitle!);
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={109}
      style={baseStyle.flexGrow}>
      <Stack.Screen
        options={{
          headerTitle: headerTitle ? headerTitle : "",
          headerRight: () => (
            <Pressable onPress={hideChat}>
              <AntDesign name="delete" size={24} color={theme.text} />
            </Pressable>
          ),
        }}
      />
      <ThemedView style={[baseStyle.flexGrow, { paddingBottom: 60 }]}>
        <ChatMessageList chatHistory={chatHistory} />
        <ChatInput chatID={currentConversationID} />
      </ThemedView>
    </KeyboardAvoidingView>
  );
}
