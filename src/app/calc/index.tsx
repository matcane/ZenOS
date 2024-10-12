import { Dimensions, FlatList, ScrollView } from "react-native";

import { ThemedText, ThemedView, CalcButton } from "@/components/core";
import { BUTTONS } from "@/constants/calc";
import { useCalc } from "@/hooks/calc/";
import { baseStyle } from "@/styles/baseStyle";
import { coreStyles } from "@/styles/core";

const { fontLG, fontMD, textCenter, flexGrow, flexGrowNone } = baseStyle;
const { calcDisplay, calcDisplayText } = coreStyles;

const screenWidth = Dimensions.get("window").width;
const numColumns = 4;
const itemWidth = screenWidth / numColumns;

export default function Page() {
  const { ref, equation, showResult, result, handleEquation } = useCalc();
  return (
    <>
      <ThemedView style={[flexGrow, calcDisplay]}>
        <ScrollView ref={ref} horizontal={true} style={flexGrowNone}>
          <ThemedText numberOfLines={1} style={[fontLG, textCenter, calcDisplayText]}>
            {equation}
          </ThemedText>
        </ScrollView>
        <ScrollView horizontal={true} style={flexGrowNone}>
          <ThemedText numberOfLines={1} style={[fontMD, textCenter, calcDisplayText]}>
            {showResult && result}
          </ThemedText>
        </ScrollView>
      </ThemedView>
      <ThemedView>
        <FlatList
          data={BUTTONS}
          renderItem={({ item, index }) => (
            <CalcButton
              button={item}
              itemWidth={itemWidth}
              onPress={() => handleEquation(item)}
              isLast={index === BUTTONS.length - 1}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
        />
      </ThemedView>
    </>
  );
}
