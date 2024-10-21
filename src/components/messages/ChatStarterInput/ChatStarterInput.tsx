import { useState } from "react";
import { TextInput } from "react-native";

import { ThemedText } from "@/components/core";
import { useTheme } from "@/hooks/core";
import { useMessages } from "@/hooks/messages/useMessages";

export default function ChatStarterInput() {
  const theme = useTheme();
  const { addNewConversation } = useMessages();
  const [targetPhoneNumber, setTargetPhoneNumber] = useState("");
  const isTargetPhoneValid = ["3", "4", "5", "6", "7", "8"].includes(targetPhoneNumber[0]);
  const formatedTargetPhoneNumber = `${targetPhoneNumber.slice(0, 3)} ${targetPhoneNumber.slice(3)}`;
  return (
    <>
      <TextInput
        autoFocus
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
        onSubmitEditing={() => addNewConversation(formatedTargetPhoneNumber)}
      />
      <ThemedText style={{ paddingLeft: 20, paddingTop: 20 }}>
        {isTargetPhoneValid ? "" : "Must start with number 3, 4, 5, 6, 7, or 8"}
      </ThemedText>
    </>
  );
}
