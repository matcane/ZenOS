import firestore from "@react-native-firebase/firestore";
import { router, Stack } from "expo-router";
import { useState } from "react";
import { TextInput } from "react-native";

import { ThemedText, ThemedView } from "@/components/core";
import { useTheme } from "@/hooks/core";
import { useAuthStore } from "@/store/core";
import { baseStyle } from "@/styles/baseStyle";

export default function ChatStarterModal() {
  const theme = useTheme();
  const [targetPhoneNumber, setTargetPhoneNumber] = useState("");
  const phoneNumber = useAuthStore((state) => state.phoneNumber);
  const sourcePhoneNumber = phoneNumber.replace(/ /g, "");

  const isTargetPhoneValid = ["3", "4", "5", "6", "7", "8"].includes(targetPhoneNumber[0]);

  const newConversation = async () => {
    if (isTargetPhoneValid) {
      const messagesRef = firestore().collection("messages");

      const existingChat = await messagesRef
        .where("chat_members", "in", [
          [sourcePhoneNumber, targetPhoneNumber],
          [targetPhoneNumber, sourcePhoneNumber],
        ])
        .get();

      if (existingChat.empty) {
        await firestore()
          .collection("messages")
          .add({ chat_members: [sourcePhoneNumber, targetPhoneNumber], history: [] });
      }

      router.replace({
        pathname: "messages/modals/[ConversationModal]",
        params: {
          slug: targetPhoneNumber.slice(0, 3) + " " + targetPhoneNumber.slice(3),
        },
      });
    }
  };

  return (
    <ThemedView style={[baseStyle.flexGrow]}>
      <Stack.Screen options={{ headerTitle: "New conversation" }} />
      <TextInput
        inputMode="decimal"
        maxLength={6}
        value={targetPhoneNumber}
        onChangeText={(text) => setTargetPhoneNumber(text)}
        style={{
          color: theme.text,
          backgroundColor: theme.container,
          paddingLeft: 20,
          fontSize: 24,
        }}
        placeholderTextColor={theme.text}
        placeholder="enter phone number"
        onSubmitEditing={newConversation}
      />
      <ThemedText style={{ paddingLeft: 20, paddingTop: 20 }}>
        {isTargetPhoneValid ? "" : "Must start with number 3, 4, 5, 6, 7, or 8"}
      </ThemedText>
    </ThemedView>
  );
}
