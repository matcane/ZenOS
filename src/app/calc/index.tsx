import { Dimensions, FlatList, ScrollView } from "react-native";

import { CalcButton } from "@/components/calc";
import { ThemedText, ThemedView } from "@/components/core";
import { BUTTONS } from "@/constants/calc";
import { useCalc } from "@/hooks/calc/";
import { baseStyle } from "@/styles/baseStyle";
import { calcStyles } from "@/styles/calc";

const screenWidth = Dimensions.get("window").width;
const numColumns = 4;
const itemWidth = screenWidth / numColumns;

export default function Page() {
  const { ref, equation, showResult, result, handleEquation } = useCalc();
  return (
    <>
      <ThemedView style={[baseStyle.flexGrow, calcStyles.calcDisplay]}>
        <ScrollView ref={ref} horizontal={true} style={baseStyle.flexGrowNone}>
          <ThemedText
            numberOfLines={1}
            style={[baseStyle.fontLG, baseStyle.textCenter, calcStyles.calcDisplayText]}>
            {equation}
          </ThemedText>
        </ScrollView>
        <ScrollView horizontal={true} style={baseStyle.flexGrowNone}>
          <ThemedText
            numberOfLines={1}
            style={[baseStyle.fontMD, baseStyle.textCenter, calcStyles.calcDisplayText]}>
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
