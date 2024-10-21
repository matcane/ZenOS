import { FlatList } from "react-native";

import { TMessage } from "@/hooks/messages";

import ChatMessage from "../ChatMessage/ChatMessage";

export default function ChatMessageList({ chatHistory }: { chatHistory: TMessage[] | undefined }) {
  return (
    <FlatList
      data={chatHistory}
      inverted={true}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <ChatMessage item={item} />}
    />
  );
}
