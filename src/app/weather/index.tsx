import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import "text-encoding";
import { Stack } from "expo-router";
import { Dimensions, FlatList, Pressable, ScrollView, View } from "react-native";

import { ThemedText, ThemedView } from "@/components/core";
import { WeatcherInfoTile, WeatherInfo } from "@/components/weather";
import { useTheme } from "@/hooks/core";
import { useWeather } from "@/hooks/weather";
import { baseStyle } from "@/styles/baseStyle";
import { weatherStyles } from "@/styles/weather";

const screenWidth = Dimensions.get("window").width;
const numColumns = 2;
const itemWidth = screenWidth / numColumns;

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

export default function Page() {
  const theme = useTheme();
  const { city, location, currentTemperature, weatherCondition, dailyData, infoTiles, error } =
    useWeather();

  if (!location) {
    return (
      <ThemedView style={[baseStyle.flexGrow, baseStyle.justifyCenter, baseStyle.itemsCenter]}>
        <ThemedText style={baseStyle.fontSM}>{error}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: theme.background }}>
      <ThemedView style={[baseStyle.flexGrow, baseStyle.itemsCenter]}>
        <Stack.Screen
          options={{
            headerTitle: city ? city : "",
            headerRight: () =>
              city ? (
                <View style={[baseStyle.flexRow, { columnGap: 30 }]}>
                  <Pressable>
                    <MaterialIcons name="location-city" size={24} color={theme.text} />
                  </Pressable>
                  <Pressable>
                    <MaterialIcons name="settings" size={24} color={theme.text} />
                  </Pressable>
                </View>
              ) : undefined,
          }}
        />

        <ThemedView style={[baseStyle.itemsCenter, baseStyle.paddingBottomXXL, { width: "100%" }]}>
          <ThemedText style={baseStyle.fontXXL}>
            {currentTemperature}
            {currentTemperature ? "°" : ""}
          </ThemedText>
          <ThemedText style={baseStyle.fontSMD}>{weatherCondition}</ThemedText>
        </ThemedView>

        <FlatList
          data={infoTiles}
          scrollEnabled={false}
          style={weatherStyles.container}
          numColumns={numColumns}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => <WeatcherInfoTile item={item} itemWidth={itemWidth} />}
        />

        <FlatList
          data={dailyData}
          scrollEnabled={false}
          style={weatherStyles.container}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => <WeatherInfo item={item} />}
        />
      </ThemedView>
    </ScrollView>
  );
}
