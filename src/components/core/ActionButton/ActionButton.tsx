import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";

import { useTheme } from "@/hooks/core";
import { baseStyle } from "@/styles/baseStyle";
import { coreStyles } from "@/styles/core";

const { sizeMD, sizeLG, sizeXL } = baseStyle;
const { actionButton } = coreStyles;

type TIconName = "play" | "pause" | "repeat";
type TVariants = "primary" | "secondary";

type ActionButtonProps = {
  variant: TVariants;
  active: boolean;
  iconName: TIconName;
  style: StyleProp<ViewStyle>;
  fn: () => void;
};

export default function ActionButton({ variant, active, iconName, style, fn }: ActionButtonProps) {
  const theme = useTheme();
  const buttonSize = variant === "primary" ? sizeXL : sizeLG;
  const iconSize = variant === "primary" ? sizeLG : sizeMD;
  const backgroudColor = variant === "primary" ? theme.primary : theme.container;

  if (!active) return null;

  return (
    <TouchableOpacity
      testID="action-button"
      onPress={active && fn}
      style={[actionButton, buttonSize, { backgroundColor: backgroudColor }, style]}>
      <MaterialCommunityIcons name={iconName} size={iconSize.height} color="white" />
    </TouchableOpacity>
  );
}
