import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import "text-encoding";
import { router, Stack } from "expo-router";
import { Dimensions, FlatList, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText, ThemedView } from "@/components/core";
import { WeatcherInfoTile, WeatherInfo } from "@/components/weather";
import { useTheme } from "@/hooks/core";
import { useWeather } from "@/hooks/weather";
import { useCitiesStore } from "@/store/weather";
import { baseStyle } from "@/styles/baseStyle";
import { weatherStyles } from "@/styles/weather";

const screenWidth = Dimensions.get("window").width;
const numColumns = 2;
const itemWidth = screenWidth / numColumns;

export default function Page() {
  const theme = useTheme();
  const { currentCityIndex, citiesNames } = useCitiesStore();
  const { city, location, temperature, weatherCondition, dailyData, infoTiles, error } =
    useWeather();

  const currentTemperature = temperature && temperature[currentCityIndex ? currentCityIndex : 0];
  const currentWeatherCondition =
    weatherCondition && weatherCondition[currentCityIndex ? currentCityIndex : 0];
  const currentDailyData = dailyData && dailyData[currentCityIndex ? currentCityIndex : 0];
  const currentInfoTiles = infoTiles && infoTiles[currentCityIndex ? currentCityIndex : 0];

  if (!location) {
    return (
      <ThemedView style={[baseStyle.flexGrow, baseStyle.justifyCenter, baseStyle.itemsCenter]}>
        <ThemedText style={baseStyle.fontSM}>{error}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <SafeAreaView edges={[]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: theme.background }}>
        <ThemedView style={[baseStyle.flexGrow, baseStyle.itemsCenter]}>
          <Stack.Screen
            options={{
              headerTitle: currentCityIndex ? citiesNames[currentCityIndex - 1] : city ? city : "",
              headerRight: () =>
                true ? (
                  <View style={[baseStyle.flexRow, { columnGap: 30 }]}>
                    <Pressable onPress={() => router.push("weather/modals/ManageCity")}>
                      <MaterialIcons name="location-city" size={24} color={theme.text} />
                    </Pressable>
                    <Pressable>
                      <MaterialIcons name="settings" size={24} color={theme.text} />
                    </Pressable>
                  </View>
                ) : undefined,
            }}
          />

          <ThemedView
            style={[baseStyle.itemsCenter, baseStyle.paddingBottomXXL, { width: "100%" }]}>
            <ThemedText style={baseStyle.fontXXL}>
              {currentTemperature}
              {currentTemperature ? "°" : ""}
            </ThemedText>
            <ThemedText style={baseStyle.fontSMD}>{currentWeatherCondition}</ThemedText>
          </ThemedView>

          <FlatList
            data={currentInfoTiles}
            scrollEnabled={false}
            style={weatherStyles.container}
            numColumns={numColumns}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => <WeatcherInfoTile item={item} itemWidth={itemWidth} />}
          />

          <FlatList
            data={currentDailyData}
            scrollEnabled={false}
            style={weatherStyles.container}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => <WeatherInfo item={item} />}
          />
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}
