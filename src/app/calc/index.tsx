import { useRef, useState } from "react";
import { Dimensions, FlatList, ScrollView } from "react-native";

import { ThemedText, ThemedView, CalcButton } from "@/components/core";
import { BUTTONS, SPECIAL_BUTTONS, TButton } from "@/constants/calc";
import { baseStyle } from "@/styles/baseStyle";
import { coreStyles } from "@/styles/core";

const { fontLG, fontMD, textCenter, flexGrow, flexGrowNone } = baseStyle;
const { calcDisplay, calcDisplayText } = coreStyles;

const screenWidth = Dimensions.get("window").width;
const numColumns = 4;
const itemWidth = screenWidth / numColumns;

export default function Page() {
  const ref = useRef<ScrollView>(null);
  const [equation, setEquation] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");

  const handleAction = (action: string) => {
    const clearAll = () => {
      setEquation([]);
      setShowResult(false);
    };

    const clearLast = () => {
      setEquation((prev) => prev.slice(0, -1));
      ref.current?.scrollToEnd({ animated: true });
      setShowResult(false);
    };

    const calculate = () => {
      const lastElement = equation.at(-1);
      const limiter = lastElement === "%" ? "/ 100" : "/ 100 *";

      const sanitizedEquation = equation
        .join("")
        .replace(/(\d)([^\d.])/g, "$1 $2")
        .replace(/([^\d.])(\d)/g, "$1 $2")
        .replace(/ \. /g, ".")
        .replace(/%/g, limiter)
        .replace(/x/g, "*");

      setResult(eval(sanitizedEquation));
      setShowResult(true);
    };

    switch (action) {
      case "clearAll":
        clearAll();
        break;
      case "clearLast":
        clearLast();
        break;
      case "calculate":
        calculate();
        break;
      default:
        break;
    }
  };

  const handleEquation = (button: TButton) => {
    if (button.char) {
      let performScroll: boolean = false;

      setEquation((prev) => {
        const lastChar = prev[prev.length - 1];
        const isCurrentSpecial = SPECIAL_BUTTONS.includes(button.char);
        const isLastSpecial = SPECIAL_BUTTONS.includes(lastChar);

        if (isCurrentSpecial && prev.length === 0 && button.char !== "-") {
          return prev;
        }

        if (isLastSpecial && isCurrentSpecial && prev.length > 1 && lastChar !== button.char) {
          performScroll = true;
          return [...prev.slice(0, -1), button.char];
        }

        if (!(isLastSpecial && isCurrentSpecial)) {
          performScroll = true;
          return [...prev, button.char];
        }

        return prev;
      });

      if (performScroll) ref.current?.scrollToEnd({ animated: true });
    }

    if (button.action) handleAction(button.action);
  };

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
              index={index}
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
