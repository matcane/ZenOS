import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { FirebaseError } from "firebase/app";
import { create } from "zustand";

import { generatePhoneNumber } from "@/utils/core";

export type TUser = {
  user: FirebaseAuthTypes.User | null;
  isLoading: boolean;
  errorData: string;
  signUp: (email: string, password: string) => void;
  signIn: (email: string, password: string) => void;
  clearError: () => void;
};

const initialState = {
  user: null,
  isLoading: false,
  errorData: "",
};

export const useAuthStore = create<TUser>((set) => ({
  ...initialState,
  signUp: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      const generatedPhoneNumber = generatePhoneNumber();
      await firestore()
        .collection("phoneNumbers")
        .add({ user_uid: auth().currentUser?.uid, phoneNumber: generatedPhoneNumber });
      set({ isLoading: false });
    } catch (e: any) {
      const err = e as FirebaseError;
      set({ errorData: err.code });
      set({ isLoading: false });
      console.error(err);
    }
  },
  signIn: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      await auth().signInWithEmailAndPassword(email, password);
      set({ isLoading: false });
    } catch (e: any) {
      const err = e as FirebaseError;
      set({ errorData: err.code });
      set({ isLoading: false });
      console.error(err);
    }
  },
  clearError: () => {
    set({ errorData: "" });
  },
}));
