import { LocationObject } from "expo-location";
import { create } from "zustand";

export type TInfoTile = {
  title: string;
  info: string | number | null;
  infoUnit?: string;
};

export type TDailyData = {
  date: Date;
  maxTemperature: number;
  minTemperature: number;
};

type WeatherStore = {
  city: string | null;
  temperature: number[] | null;
  weatherCondition: string[] | null;
  location: LocationObject | null;
  dailyData: TDailyData[] | null;
  infoTiles: TInfoTile[] | null;
  loading: boolean;
  error: string | null;
  setCity: (city: string | null) => void;
  setTemperature: (temperature: number[] | null) => void;
  setWeatherCondition: (condition: string[] | null) => void;
  setLocation: (location: LocationObject | null) => void;
  setDailyData: (data: TDailyData[] | null) => void;
  setInfoTiles: (tiles: TInfoTile[] | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useWeatherStore = create<WeatherStore>((set) => ({
  city: null,
  temperature: null,
  weatherCondition: null,
  location: null,
  dailyData: null,
  infoTiles: null,
  loading: false,
  error: null,
  setCity: (city) => set({ city }),
  setTemperature: (temperature) => set({ temperature: temperature }),
  setWeatherCondition: (condition) => set({ weatherCondition: condition }),
  setLocation: (location) => set({ location }),
  setDailyData: (data) => set({ dailyData: data }),
  setInfoTiles: (tiles) => set({ infoTiles: tiles }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
