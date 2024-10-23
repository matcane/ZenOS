import { Dimensions } from "react-native";

import { TDailyData } from "@/app/weather";
import { ThemedText, ThemedView } from "@/components/core";
import { useTheme } from "@/hooks/core";
import { baseStyle } from "@/styles/baseStyle";

const screenWidth = Dimensions.get("window").width;

export default function WeatherInfo({ item }: { item: TDailyData }) {
  const theme = useTheme();
  return (
    <ThemedView
      style={[
        baseStyle.flexRow,
        baseStyle.justifyBetween,
        baseStyle.marginSM,
        baseStyle.paddingSM,
        baseStyle.paddingHorizontalMD,
        baseStyle.roundedFull,
        { backgroundColor: theme.container },
        { width: screenWidth - baseStyle.marginSM.margin * 2 },
      ]}>
      <ThemedText style={baseStyle.fontSMD}>{item.date.toDateString().slice(4, 15)}</ThemedText>
      <ThemedView style={[baseStyle.flexRow, { backgroundColor: theme.container }]}>
        <ThemedText style={baseStyle.fontSMD}>{item.minTemperature}°</ThemedText>
        <ThemedText style={baseStyle.fontSMD}>/</ThemedText>
        <ThemedText style={baseStyle.fontSMD}>{item.maxTemperature}°</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}
