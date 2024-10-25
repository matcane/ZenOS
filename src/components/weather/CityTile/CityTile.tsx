import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRef, useState } from "react";
import { Dimensions, Pressable } from "react-native";
import { GestureHandlerRootView, RectButton, Swipeable } from "react-native-gesture-handler";

import { ThemedText, ThemedView } from "@/components/core";
import { useTheme } from "@/hooks/core";
import { baseStyle } from "@/styles/baseStyle";

const screenWidth = Dimensions.get("window").width;

export default function CityTile({
  city,
  isLocal = false,
  currentTemperature,
  weatherCondition,
  action,
  onDelete,
}: {
  city: string | null;
  isLocal?: boolean;
  currentTemperature: number | string | null;
  weatherCondition: string | null;
  action: () => void;
  onDelete?: () => void;
}) {
  const theme = useTheme();
  const [isSwiped, setIsSwiped] = useState(false);
  const swipeableRef = useRef<Swipeable>(null);

  const renderRightActions = () => {
    return (
      <RectButton
        style={[
          {
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: "flex-end",
            paddingHorizontal: 20,
          },
          baseStyle.heightXXL,
          baseStyle.roundedLG,
          baseStyle.marginMD,
        ]}
        onPress={() => {
          swipeableRef.current?.close();
          onDelete && onDelete();
        }}>
        <MaterialIcons name="delete" size={24} color="#fff" />
      </RectButton>
    );
  };

  return (
    <GestureHandlerRootView style={{ flexGrow: 1 }}>
      <Swipeable
        ref={swipeableRef}
        renderRightActions={renderRightActions}
        overshootRight={false}
        onSwipeableWillOpen={() => setIsSwiped(true)}
        onSwipeableWillClose={() => setIsSwiped(false)}
        containerStyle={baseStyle.itemsEnd}>
        <Pressable
          onPress={action}
          style={[
            baseStyle.itemsStart,
            baseStyle.justifyBetween,
            baseStyle.flexRow,
            baseStyle.heightXXL,
            baseStyle.roundedLG,
            baseStyle.marginMD,
            baseStyle.paddingXL,
            { backgroundColor: theme.primary },
            {
              width: isSwiped
                ? screenWidth - baseStyle.marginXL.margin - 80
                : screenWidth - baseStyle.marginXL.margin,
            },
          ]}>
          <ThemedView style={[baseStyle.flexRow, baseStyle.transparent]}>
            <ThemedText style={baseStyle.fontSMD}>{city}</ThemedText>
            {isLocal && (
              <MaterialIcons
                name="location-on"
                size={baseStyle.fontSMD.fontSize}
                color={theme.text}
              />
            )}
          </ThemedView>

          <ThemedView style={[baseStyle.flexCol, baseStyle.transparent]}>
            <ThemedText style={[baseStyle.fontMD, baseStyle.textRight]}>
              {currentTemperature}
            </ThemedText>
            <ThemedText style={[baseStyle.fontSMD, baseStyle.textRight]}>
              {weatherCondition}
            </ThemedText>
          </ThemedView>
        </Pressable>
      </Swipeable>
    </GestureHandlerRootView>
  );
}
