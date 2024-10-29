import * as Location from "expo-location";
import { create } from "zustand";

import { storage } from "@/MMKV";

const getCitiesCordsFromStorage = () => {
  const citiesCords = storage.getString("citiesCords");
  return citiesCords ? JSON.parse(citiesCords) : [];
};

const getCitiesNamesFromStorage = () => {
  const citiesNames = storage.getString("citiesNames");
  return citiesNames ? JSON.parse(citiesNames) : [];
};

type TCitiesStore = {
  currentCityIndex: number | null;
  citiesCords: { latitude: number; longitude: number }[];
  citiesNames: string[];
  success: boolean;
  error: boolean;
  clearError: () => void;
  clearSuccess: () => void;
  addCity: (city: string) => void;
  removeCity: (city: string) => void;
  setCurrentCityIndex: (city: string) => void;
  clearCurrentCityIndex: () => void;
  clearCities: () => void;
};

const initialState = {
  success: false,
  error: false,
  locationCity: null,
  currentCityIndex: null,
  citiesCords: getCitiesCordsFromStorage(),
  citiesNames: getCitiesNamesFromStorage(),
};

export const useCitiesStore = create<TCitiesStore>((set) => ({
  ...initialState,
  clearError: () => {
    set({ error: false });
  },
  clearSuccess: () => {
    set({ success: false });
  },
  addCity: async (city) => {
    const citiesNamesState = useCitiesStore.getState().citiesNames;
    const citiesCordsState = useCitiesStore.getState().citiesCords;

    if (citiesNamesState.includes(city)) {
      set({ success: true });
      return;
    }

    const updatedCitiesNames = [...citiesNamesState, city];

    const newCityCords = await Location.geocodeAsync(city);
    if (newCityCords.length > 0) {
      const updatedCitiesCords = [
        ...citiesCordsState,
        { latitude: newCityCords[0].latitude, longitude: newCityCords[0].longitude },
      ];

      storage.set("citiesNames", JSON.stringify(updatedCitiesNames));
      storage.set("citiesCords", JSON.stringify(updatedCitiesCords));

      set({ success: true, citiesNames: updatedCitiesNames, citiesCords: updatedCitiesCords });
    } else {
      set({ error: true });
    }
  },
  removeCity: async (city) => {
    const currentCityIndex = useCitiesStore.getState().currentCityIndex;
    const citiesNamesState = useCitiesStore.getState().citiesNames;
    const citiesCordsState = useCitiesStore.getState().citiesCords;

    if (citiesNamesState.includes(city)) {
      const indexToDelete = citiesNamesState.findIndex((name) => name === city);

      const updatedCitiesNames = citiesNamesState.filter((name) => name !== city);

      const cordsToDelete = citiesCordsState.at(indexToDelete);

      const updatedCitiesCords = citiesCordsState.filter((cords) => cords !== cordsToDelete);

      if (indexToDelete + 1 === currentCityIndex) {
        set({ currentCityIndex: null });
      }

      storage.set("citiesNames", JSON.stringify(updatedCitiesNames));
      storage.set("citiesCords", JSON.stringify(updatedCitiesCords));

      set({ citiesNames: updatedCitiesNames, citiesCords: updatedCitiesCords });
    }
  },
  setCurrentCityIndex: (city) => {
    const citiesNamesState = useCitiesStore.getState().citiesNames;
    if (citiesNamesState.includes(city)) {
      set({ currentCityIndex: citiesNamesState.findIndex((name) => name === city) + 1 });
    }
  },
  clearCurrentCityIndex: () => {
    set({ currentCityIndex: null });
  },
  clearCities: () => {
    storage.delete("citiesNames");
    storage.delete("citiesCords");
    set({ citiesNames: getCitiesNamesFromStorage(), citiesCords: getCitiesCordsFromStorage() });
  },
}));
