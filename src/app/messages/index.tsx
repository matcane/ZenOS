import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import firestore, { Timestamp } from "@react-native-firebase/firestore";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable } from "react-native";

import { ActionButton, ThemedText, ThemedView } from "@/components/core";
import { useTheme } from "@/hooks/core";
import { useAuthStore } from "@/store/core";
import { baseStyle } from "@/styles/baseStyle";
import { coreStyles } from "@/styles/core";

type TMessages = {
  chat_members: string[];
  history: {
    author: string;
    creation_date: Timestamp;
    message: string;
  }[];
};

export default function Page() {
  const theme = useTheme();
  const phoneNumber = useAuthStore((state) => state.phoneNumber);
  const [messagesList, setMessagesList] = useState<TMessages[]>([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("messages")
      .where("chat_members", "array-contains", phoneNumber.replace(/ /g, ""))
      .onSnapshot(
        (snapshot) => {
          const messagesArray = snapshot.docs.map((doc) => {
            const data = doc.data();
            return data as TMessages;
          });

          setMessagesList(() => messagesArray);
        },
        (error) => {
          console.error("Error fetching charactersss: ", error);
        },
      );

    return () => unsubscribe();
  }, [phoneNumber]);

  return (
    <ThemedView style={baseStyle.flexGrow}>
      <FlatList
        data={messagesList}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "messages/modals/[ConversationModal]",
                params: {
                  slug: item.chat_members
                    .filter((member: string) => member !== phoneNumber.replace(/ /g, ""))
                    .map((member: string) => member.slice(0, 3) + " " + member.slice(3)),
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
            <ThemedView
              style={[baseStyle.transparent, baseStyle.paddingSM, baseStyle.marginLeftSM]}>
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
                  {item.chat_members
                    .filter((member: string) => member !== phoneNumber.replace(/ /g, ""))
                    .map((member: string) => member.slice(0, 3) + " " + member.slice(3))}
                </ThemedText>
                <ThemedText style={baseStyle.paddingRightSM}>
                  {item.history.at(-1)?.creation_date.toDate().toLocaleString().slice(0, 10)}
                </ThemedText>
              </ThemedView>
              <ThemedView style={[baseStyle.transparent, baseStyle.flexGrow, { maxWidth: "80%" }]}>
                <ThemedText numberOfLines={2} style={[baseStyle.paddingLeftSM, baseStyle.fontSM]}>
                  {item.history.at(-1)?.message}
                </ThemedText>
              </ThemedView>
            </ThemedView>
          </Pressable>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <ActionButton
        active={true}
        fn={() => router.push("messages/modals/ChatStarterModal")}
        iconName="message-text"
        variant="primary"
        style={coreStyles.newMessage}
      />
    </ThemedView>
  );
}
