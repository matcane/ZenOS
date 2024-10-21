import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";

import { useAuthStore } from "@/store/core";

export function useUser() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const phoneNumber = useAuthStore((state) => state.phoneNumber);
  const setPhoneNumber = useAuthStore((state) => state.setPhoneNumber);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

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
            setPhoneNumber(phoneData.phoneNumber || "No phone number found");
          } else {
            setPhoneNumber("No phone number found");
          }
        }
      } catch (error) {
        console.error("Error fetching phone number:", error);
      }
    };

    if (phoneNumber.length === 0) fetchPhoneNumber();
  }, [phoneNumber.length, setPhoneNumber]);

  return { user };
}
