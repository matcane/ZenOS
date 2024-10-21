import firestore, { Timestamp } from "@react-native-firebase/firestore";
import { router } from "expo-router";
import { useEffect, useState } from "react";

import { useAuthStore } from "@/store/core";
import { useHiddenNumbersStore } from "@/store/messages";

export type TMessage = {
  author: string;
  creation_date: Timestamp;
  message: string;
};

export type TMessages = {
  chat_members: string[];
  history: TMessage[];
};

export type TFireStoreMessage = {
  docID: string;
  data: TMessages;
};

export function useMessages() {
  const currentPhoneNumber = useAuthStore((state) => state.phoneNumber);
  const { removeHiddenNumber } = useHiddenNumbersStore();
  const [messagesList, setMessagesList] = useState<TFireStoreMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("messages")
      .where("chat_members", "array-contains", currentPhoneNumber)
      .onSnapshot(
        (snapshot) => {
          const messagesArray = snapshot.docs.map((doc) => {
            const data = doc.data() as TMessages;

            return {
              docID: doc.id,
              data: {
                ...data,
                history: data.history ? [...data.history].reverse() : [],
              },
            };
          });

          setMessagesList(() => messagesArray);
        },
        (error) => {
          console.error("Error fetching messages: ", error);
        },
      );

    return () => unsubscribe();
  }, [currentPhoneNumber]);

  const addNewConversation = async (targetPhoneNumber: string) => {
    const isTargetPhoneValid = ["3", "4", "5", "6", "7", "8"].includes(targetPhoneNumber[0]);

    if (isTargetPhoneValid) {
      const messagesRef = firestore().collection("messages");

      removeHiddenNumber(targetPhoneNumber);

      const existingChat = await messagesRef
        .where("chat_members", "in", [
          [currentPhoneNumber, targetPhoneNumber],
          [targetPhoneNumber, currentPhoneNumber],
        ])
        .get();

      if (!existingChat.empty) {
        const chatID = existingChat.docs[0].id;
        router.replace({
          pathname: "messages/modals/[ConversationModal]",
          params: {
            slug: chatID,
          },
        });
      } else {
        const newChatRef = await firestore()
          .collection("messages")
          .add({ chat_members: [currentPhoneNumber, targetPhoneNumber], history: [] });
        router.replace({
          pathname: "messages/modals/[ConversationModal]",
          params: {
            slug: newChatRef.id,
          },
        });
      }
    }
  };

  const addNewMessage = async (docID: string) => {
    try {
      const newMessageObject = {
        author: currentPhoneNumber,
        creation_date: firestore.Timestamp.fromDate(new Date()),
        message: newMessage,
      };
      // Lokalna aktualizacja `messagesList`
      setMessagesList((prevMessagesList) =>
        prevMessagesList.map((chat) =>
          chat.docID === docID
            ? {
                ...chat,
                data: {
                  ...chat.data,
                  history: [newMessageObject, ...chat.data.history], // dodaj wiadomość lokalnie
                },
              }
            : chat,
        ),
      );
      const docRef = firestore().collection("messages").doc(docID);

      setNewMessage("");

      // Zaktualizowanie Firestore
      await docRef.update({
        history: firestore.FieldValue.arrayUnion(newMessageObject),
      });
    } catch (error) {
      console.error("Błąd podczas dodawania wiadomości: ", error);
    }
  };

  return {
    messagesList,
    currentPhoneNumber,
    newMessage,
    setMessagesList,
    setNewMessage,
    addNewMessage,
    addNewConversation,
  };
}
