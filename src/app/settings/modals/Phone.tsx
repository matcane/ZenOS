import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { Pressable } from "react-native";

import { ThemedText, ThemedView } from "@/components/core";
import { useTheme } from "@/hooks/core";
import { baseStyle } from "@/styles/baseStyle";
import { coreStyles } from "@/styles/core";

const { firstSettingsFieldItem, lastSettingsFieldItem } = coreStyles;

const { flexGrow, paddingLG, justifyBetween, flexRow, paddingMD } = baseStyle;

export default function Phone() {
  const theme = useTheme();
  const containerStyles = [
    { backgroundColor: theme.container },
    flexRow,
    paddingMD,
    justifyBetween,
    firstSettingsFieldItem,
    lastSettingsFieldItem,
  ];

  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const fetchPhoneNumber = async () => {
      try {
        const userUid = auth().currentUser?.uid;
        if (userUid) {
          const querySnapshot = await firestore()
            .collection("phoneNumbers")
            .where("user_uid", "==", userUid)
            .get();

          if (!querySnapshot.empty) {
            const phoneData = querySnapshot.docs[0].data();
            const formattedPhoneNumber = `${phoneData.phoneNumber.slice(0, 3)} ${phoneData.phoneNumber.slice(3)}`;
            setPhoneNumber(formattedPhoneNumber || "No phone number found");
          } else {
            setPhoneNumber("No phone number found");
          }
        }
      } catch (error) {
        console.error("Error fetching phone number:", error);
      }
    };

    fetchPhoneNumber();
  }, []);

  return (
    <ThemedView style={[flexGrow, paddingLG]}>
      <Pressable style={containerStyles}>
        <ThemedText>Phone Number</ThemedText>
        <ThemedText>{phoneNumber}</ThemedText>
      </Pressable>
    </ThemedView>
  );
}
