import { Stack } from "expo-router";

import { ThemedView } from "@/components/core";
import { ChatStarterInput } from "@/components/messages";
import { baseStyle } from "@/styles/baseStyle";

export default function ChatStarterModal() {
  return (
    <ThemedView style={[baseStyle.flexGrow]}>
      <Stack.Screen options={{ headerTitle: "New conversation" }} />
      <ChatStarterInput />
    </ThemedView>
  );
}
