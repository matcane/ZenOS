import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRef, useState } from "react";
import { Dimensions, FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/core";
import { useThemeColor } from "@/hooks/useTheme";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function Page() {
  const theme = useThemeColor();
  const ref = useRef<ScrollView>(null);
  const [equation, setEquation] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");
  const buttons = [
    { iconName: "c", char: "", action: "clearAll" },
    { iconName: "percent", char: "%", action: "" },
    { iconName: "delete-left", char: "", action: "clearLast" },
    { iconName: "", char: "/", action: "" },
    { iconName: "7", char: "7", action: "" },
    { iconName: "8", char: "8", action: "" },
    { iconName: "9", char: "9", action: "" },
    { iconName: "xmark", char: "x", action: "" },
    { iconName: "4", char: "4", action: "" },
    { iconName: "5", char: "5", action: "" },
    { iconName: "6", char: "6", action: "" },
    { iconName: "minus", char: "-", action: "" },
    { iconName: "1", char: "1", action: "" },
    { iconName: "2", char: "2", action: "" },
    { iconName: "3", char: "3", action: "" },
    { iconName: "plus", char: "+", action: "" },
    { iconName: "0", char: "0", action: "" },
    { iconName: "", char: ".", action: "" },
    { iconName: "equals", char: "", action: "calculate" },
  ];
  const specialButtons = ["/", "x", "-", "=", "%", "+", "."];
  const numColumns = 4;
  const numRows = 5;
  const itemWidth = screenWidth / numColumns;
  const itemHeight = Math.floor(screenHeight / numRows / 1.5);

  const handleAction = (action: string) => {
    if (action === "clearAll") {
      setEquation([]);
      setShowResult(false);
    }

    if (action === "clearLast") {
      setEquation((prev) => prev.slice(0, -1));
      ref.current?.scrollToEnd({ animated: true });
      setShowResult(false);
    }
    if (action === "calculate") {
      const limiter = equation.at(-1) === "%" ? "/ 100" : "/ 100 *";
      setResult(
        eval(
          equation
            .join("")
            .replace(/(\d)([^\d.])/g, "$1 $2")
            .replace(/([^\d.])(\d)/g, "$1 $2")
            .replace(/ \. /g, ".")
            .replace(/%/g, limiter)
            .replace(/x/g, "*"),
        ),
      );
      setShowResult(true);
    }
  };

  const handleEquation = (item: { iconName: string; char: string; action: string }) => {
    if (item.char) {
      let performScroll: boolean = false;
      setEquation((prev) => {
        const lastChar = prev[prev.length - 1];

        if (specialButtons.includes(item.char) && prev.length === 0 && item.char !== "-") {
          return prev;
        }

        if (
          specialButtons.includes(lastChar) &&
          specialButtons.includes(item.char) &&
          prev.length > 1 &&
          lastChar !== item.char
        ) {
          performScroll = true;
          return [...prev.slice(0, -1), item.char];
        } else if (!(specialButtons.includes(lastChar) && specialButtons.includes(item.char))) {
          performScroll = true;
          return [...prev, item.char];
        }

        return prev;
      });
      if (performScroll) ref.current?.scrollToEnd({ animated: true });
    }
    if (item.action) handleAction(item.action);
  };

  return (
    <>
      <View
        style={[
          styles.wrapper,
          {
            backgroundColor: theme.background,
            paddingBottom: 20,
            alignItems: "flex-end",
            justifyContent: "flex-end",
          },
        ]}>
        <ScrollView ref={ref} horizontal={true} style={{ flex: 0, flexGrow: 0 }}>
          <ThemedText
            numberOfLines={1}
            style={{ paddingHorizontal: 20, fontSize: 48, textAlign: "right" }}>
            {equation}
          </ThemedText>
        </ScrollView>
        <ScrollView horizontal={true} style={{ flex: 0, flexGrow: 0 }}>
          <ThemedText
            numberOfLines={1}
            style={{ paddingHorizontal: 10, fontSize: 32, textAlign: "right" }}>
            {showResult && result}
          </ThemedText>
        </ScrollView>
      </View>
      <View style={{ backgroundColor: theme.background }}>
        <FlatList
          data={buttons}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => handleEquation(item)}
              style={[
                styles.container,
                {
                  justifyContent: "center",
                  height: itemHeight,
                  width: index === buttons.length - 1 ? itemWidth * 2 : itemWidth,
                  backgroundColor: index === buttons.length - 1 ? theme.primary : theme.container,
                },
              ]}>
              {item.iconName ? (
                <FontAwesome6 name={item.iconName} size={32} color={theme.text} />
              ) : (
                <ThemedText style={{ fontSize: 36 }}>{item.char}</ThemedText>
              )}
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
  },
  container: {
    padding: 20,
    alignItems: "center",
  },
});
