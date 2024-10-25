import { WeatherApiResponse } from "@openmeteo/sdk/weather-api-response";
import * as Location from "expo-location";
import { fetchWeatherApi } from "openmeteo";
import { useEffect, useCallback, useState } from "react";

import { weatherConditionsMap } from "@/constants/weather";
import { TDailyData, TInfoTile, useCitiesStore, useWeatherStore } from "@/store/weather";
import { getDirection } from "@/utils/weather";

export function useWeather() {
  const [city, setCity] = useState<string | null>(null);
  const [temperature, setTemperature] = useState<number[] | null>(null);
  const [weatherCondition, setWeatherCondition] = useState<string[] | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [dailyData, setDailyData] = useState<TDailyData[][] | null>(null);
  const [infoTiles, setInfoTiles] = useState<TInfoTile[][] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const setCityStore = useWeatherStore((state) => state.setCity);
  const setCurrentTemperatureStore = useWeatherStore((state) => state.setTemperature);
  const setWeatherConditionStore = useWeatherStore((state) => state.setWeatherCondition);

  const citiesCords = useCitiesStore((state) => state.citiesCords);

  const getLocation = useCallback(async () => {
    try {
      setLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Location permission not granted");
        return;
      }
      let locationCheck = await Location.getCurrentPositionAsync({});
      setLocation(locationCheck);
    } catch {
      setError("Error fetching location");
    } finally {
      setLoading(false);
    }
  }, [setError, setLoading, setLocation]);

  const getCity = useCallback(async () => {
    if (!location) return;
    try {
      const geocode = await Location.reverseGeocodeAsync({
        latitude: location?.coords.latitude,
        longitude: location?.coords.longitude,
      });
      setCity(geocode[0]?.city);
      setCityStore(geocode[0]?.city);
    } catch {
      setError("Error fetching city name");
    }
  }, [location, setCityStore]);

  const fetchWeather = useCallback(async () => {
    if (!location) return;
    try {
      setLoading(true);

      const params = {
        latitude: [location?.coords.latitude, ...citiesCords.map((city) => city.latitude)],
        longitude: [location?.coords.longitude, ...citiesCords.map((city) => city.longitude)],
        current: [
          "temperature_2m",
          "relative_humidity_2m",
          "rain",
          "weather_code",
          "cloud_cover",
          "wind_speed_10m",
          "wind_direction_10m",
        ],
        daily: ["temperature_2m_max", "temperature_2m_min"],
        temperature_unit: "celsius",
        timezone: "auto",
      };

      const url = "https://api.open-meteo.com/v1/forecast";
      const responses = await fetchWeatherApi(url, params);

      const allDailyData: TDailyData[][] = [];
      const allInfoTiles: TInfoTile[][] = [];
      const allCurrentTemperatures: number[] = [];
      const allWeatherConditions: string[] = [];

      responses.forEach((response) => {
        const { weatherData, currentDetails, dailyDetails } = parseWeatherData(response);

        allDailyData.push(dailyDetails);
        allInfoTiles.push(currentDetails);
        allWeatherConditions.push(weatherConditionsMap[weatherData.current.weatherCode]);
        allCurrentTemperatures.push(Math.floor(weatherData.current.temperature2m));
      });

      setDailyData(allDailyData);
      setInfoTiles(allInfoTiles);
      setWeatherCondition(allWeatherConditions);
      setWeatherConditionStore(allWeatherConditions);
      setTemperature(allCurrentTemperatures);
      setCurrentTemperatureStore(allCurrentTemperatures);
    } catch {
      setError("Error fetching weather data");
    } finally {
      setLoading(false);
    }
  }, [citiesCords, location, setCurrentTemperatureStore, setWeatherConditionStore]);

  const parseWeatherData = (response: WeatherApiResponse) => {
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const current = response.current()!;
    const daily = response.daily()!;

    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    const weatherData = {
      current: {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        temperature2m: current.variables(0)!.value(),
        relativeHumidity2m: current.variables(1)!.value(),
        rain: current.variables(2)!.value(),
        weatherCode: current.variables(3)!.value(),
        cloudCover: current.variables(4)!.value(),
        windSpeed10m: current.variables(5)!.value(),
        windDirection10m: current.variables(6)!.value(),
      },
      daily: {
        time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
          (t) => new Date((t + utcOffsetSeconds) * 1000),
        ),
        temperature2mMax: daily.variables(0)!.valuesArray()!,
        temperature2mMin: daily.variables(1)!.valuesArray()!,
      },
    };

    const currentDetails = [
      {
        title: `Wind ${getDirection(current.variables(6)!.value())}`,
        info: current.variables(5)!.value().toFixed(1).replace(".0", ""),
        infoUnit: "km/h",
      },
      { title: "Rain", info: current.variables(2)!.value(), infoUnit: "%" },
      {
        title: "Humidity",
        info: Math.floor(current.variables(1)!.value()),
        infoUnit: "%",
      },
      {
        title: "Cloud Cover",
        info: Math.floor(current.variables(4)!.value()),
        infoUnit: "%",
      },
    ];

    const dailyDetails = weatherData.daily.time.map((date, index) => {
      return {
        date: date,
        maxTemperature: Math.round(weatherData.daily.temperature2mMax[index]),
        minTemperature: Math.round(weatherData.daily.temperature2mMin[index]),
      };
    });

    return { weatherData, currentDetails, dailyDetails };
  };

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  useEffect(() => {
    if (location) {
      getCity();
      fetchWeather();
    }
  }, [location, getCity, fetchWeather]);

  return {
    city,
    location,
    temperature,
    weatherCondition,
    dailyData,
    infoTiles,
    loading,
    error,
  };
}
