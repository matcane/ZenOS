import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { Pressable } from "react-native";

import { ThemedText, ThemedView } from "@/components/core";
import { useTheme } from "@/hooks/core";
import { TFireStoreMessage, useMessages } from "@/hooks/messages/useMessages";
import { baseStyle } from "@/styles/baseStyle";

export default function ChatMessageInfo({ item }: { item: TFireStoreMessage }) {
  const theme = useTheme();
  const { currentPhoneNumber } = useMessages();
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "messages/modals/[ConversationModal]",
          params: {
            slug: item.docID,
          },
        })
      }
      android_ripple={{ color: theme.primary }}
      style={[
        baseStyle.justifyAround,
        baseStyle.marginLG,
        baseStyle.roundedLG,
        baseStyle.heightXL,
        baseStyle.flexRow,
        { backgroundColor: theme.container },
      ]}>
      <ThemedView style={[baseStyle.transparent, baseStyle.paddingSM, baseStyle.marginLeftSM]}>
        <FontAwesome6 name="user-large" size={48} color={theme.text} />
      </ThemedView>
      <ThemedView style={[baseStyle.transparent, baseStyle.flexGrow]}>
        <ThemedView
          style={[
            baseStyle.flexRow,
            baseStyle.justifyBetween,
            baseStyle.transparent,
            baseStyle.marginRightMD,
          ]}>
          <ThemedText style={[baseStyle.paddingLeftSM, { fontWeight: "bold" }]}>
            {item.data.chat_members.filter((member: string) => member !== currentPhoneNumber)}
          </ThemedText>
          <ThemedText style={baseStyle.paddingRightSM}>
            {item.data.history.at(0)?.creation_date.toDate().toLocaleString().slice(0, 10)}
          </ThemedText>
        </ThemedView>
        <ThemedView style={[baseStyle.transparent, baseStyle.flexGrow, { maxWidth: "80%" }]}>
          <ThemedText numberOfLines={2} style={[baseStyle.paddingLeftSM, baseStyle.fontSM]}>
            {item.data.history.at(0)?.message}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </Pressable>
  );
}