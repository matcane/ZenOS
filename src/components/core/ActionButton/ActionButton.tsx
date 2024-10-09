import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

import { useThemeColor } from "@/hooks/useTheme";

type IconName = "play" | "pause" | "repeat";

export default function FloatingButton({
  type,
  active,
  icon,
  style,
  fn,
}: {
  type: "primary" | "secondary";
  active: boolean;
  icon: IconName;
  style: StyleProp<ViewStyle>;
  fn: () => void;
}) {
  const theme = useThemeColor();
  const button_size = type === "primary" ? 60 : 50;
  const icon_size = type === "primary" ? 44 : 32;
  const backgroudColor = type === "primary" ? theme.primary : theme.container;

  if (!active) return null;

  return (
    <TouchableOpacity
      onPress={active && fn}
      style={[
        styles.button,
        { backgroundColor: backgroudColor, width: button_size, height: button_size },
        style,
      ]}>
      <MaterialCommunityIcons name={icon} size={icon_size} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});
