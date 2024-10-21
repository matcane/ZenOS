import { create } from "zustand";

import { storage } from "@/MMKV";

const getHiddenNumbersFromStorage = () => {
  const hiddenNumbers = storage.getString("hiddenNumbers");
  return hiddenNumbers ? JSON.parse(hiddenNumbers) : [];
};

type THiddenNumbersStore = {
  hiddenNumbers: string[];
  addHiddenNumber: (number: string) => void;
  removeHiddenNumber: (number: string) => void;
  clearHiddenNumbers: () => void;
};

const initialState = {
  hiddenNumbers: getHiddenNumbersFromStorage(),
};

export const useHiddenNumbersStore = create<THiddenNumbersStore>((set) => ({
  ...initialState,

  addHiddenNumber: (number) => {
    set((state) => {
      const updatedNumbers = [...state.hiddenNumbers, number];
      storage.set("hiddenNumbers", JSON.stringify(updatedNumbers));
      return { hiddenNumbers: updatedNumbers };
    });
  },

  removeHiddenNumber: (number) => {
    set((state) => {
      const updatedNumbers = state.hiddenNumbers.filter((n) => n !== number);
      storage.set("hiddenNumbers", JSON.stringify(updatedNumbers));
      return { hiddenNumbers: updatedNumbers };
    });
  },

  clearHiddenNumbers: () => {
    set(() => {
      storage.delete("hiddenNumbers");
      return { hiddenNumbers: [] };
    });
  },
}));
