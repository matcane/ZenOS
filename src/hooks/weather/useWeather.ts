import { WeatherApiResponse } from "@openmeteo/sdk/weather-api-response";
import * as Location from "expo-location";
import { fetchWeatherApi } from "openmeteo";
import { useState, useEffect, useCallback } from "react";

import { TDailyData, TInfoTile } from "@/app/weather";
import { weatherConditionsMap } from "@/constants/weather";
import { getDirection } from "@/utils/weather";

export function useWeather() {
  const [city, setCity] = useState<string | null>(null);
  const [currentTemperature, setCurrentTemperature] = useState<number | null>(null);
  const [weatherCondition, setWeatherCondition] = useState<string | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [dailyData, setDailyData] = useState<TDailyData[] | null>(null);
  const [infoTiles, setInfoTiles] = useState<TInfoTile[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
  }, []);

  const getCity = useCallback(async () => {
    if (!location) return;
    try {
      const geocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setCity(geocode[0]?.city || "Unknown");
    } catch {
      setError("Error fetching city name");
    }
  }, [location]);

  const fetchWeather = useCallback(async () => {
    if (!location) return;
    try {
      setLoading(true);

      const params = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
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

      const { weatherData, currentDetails, dailyDetails } = parseWeatherData(responses[0]);

      setDailyData(dailyDetails);
      setInfoTiles(currentDetails);
      setWeatherCondition(weatherConditionsMap[weatherData.current.weatherCode]);
      setCurrentTemperature(Math.floor(weatherData.current.temperature2m));
    } catch {
      setError("Error fetching weather data");
    } finally {
      setLoading(false);
    }
  }, [location]);

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
    currentTemperature,
    weatherCondition,
    dailyData,
    infoTiles,
    loading,
    error,
  };
}
