import { router } from "expo-router";
import { FlatList } from "react-native";

import { ActionButton, ThemedView } from "@/components/core";
import { CityTile } from "@/components/weather";
import { useCitiesStore, useWeatherStore } from "@/store/weather";
import { baseStyle } from "@/styles/baseStyle";

export default function ManageCity() {
  const { citiesNames, removeCity, setCurrentCityIndex, clearCurrentCityIndex } = useCitiesStore();
  const { city, temperature, weatherCondition } = useWeatherStore();

  const handleCityChange = (item: string) => {
    if (item) {
      setCurrentCityIndex(item);
    } else {
      clearCurrentCityIndex();
    }
    router.dismiss();
  };

  return (
    <ThemedView style={baseStyle.flexGrow}>
      <FlatList
        data={citiesNames}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={() => (
          <CityTile
            city={city}
            isLocal
            currentTemperature={temperature![0]}
            weatherCondition={weatherCondition![0]}
            action={() => handleCityChange("")}
          />
        )}
        renderItem={({ item, index }) => (
          <CityTile
            city={item}
            currentTemperature={temperature ? temperature[index + 1] : ""}
            weatherCondition={weatherCondition ? weatherCondition[index + 1] : ""}
            action={() => handleCityChange(item)}
            onDelete={() => removeCity(item)}
          />
        )}
      />
      <ActionButton
        variant="primary"
        active={true}
        iconName="plus"
        fn={() => router.push("weather/modals/AddCity")}
        style={{ right: "5%", bottom: "5%", borderColor: "#ffffff", borderWidth: 2 }}
      />
    </ThemedView>
  );
}
