import { router } from "expo-router";
import { FlatList } from "react-native";

import { ActionButton, ThemedView } from "@/components/core";
import { ChatMessageInfo } from "@/components/messages";
import { useMessages } from "@/hooks/messages";
import { useHiddenNumbersStore } from "@/store/messages";
import { baseStyle } from "@/styles/baseStyle";
import { messagesStyles } from "@/styles/messages";

export default function Page() {
  const { messagesList } = useMessages();
  const { hiddenNumbers } = useHiddenNumbersStore();

  const filteredList = messagesList.filter(
    (message) => !message.data.chat_members.some((member) => hiddenNumbers.includes(member)),
  );

  return (
    <ThemedView style={baseStyle.flexGrow}>
      <FlatList
        data={filteredList}
        renderItem={({ item, index }) => <ChatMessageInfo item={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
      <ActionButton
        active={true}
        fn={() => router.push("messages/modals/ChatStarterModal")}
        iconName="message-text"
        variant="primary"
        style={messagesStyles.newMessage}
      />
    </ThemedView>
  );
}
