import { create } from "zustand";

type TDateTimeStore = {
  dateTime: Date;
  currentTime: string;
  currentDate: string;
  setDateTime: (newDateTime: Date) => void;
};

const initialState = {
  dateTime: new Date(),
  currentTime: "",
  currentDate: "",
};

export const useDateTimeStore = create<TDateTimeStore>((set) => ({
  ...initialState,
  setDateTime: (newDateTime) => {
    set({
      dateTime: newDateTime,
      currentTime: newDateTime.toTimeString().slice(0, 8),
      currentDate: newDateTime.toDateString(),
    });
  },
}));
