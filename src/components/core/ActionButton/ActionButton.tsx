import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Image } from "expo-image";
import { StyleProp, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native";

import { useTheme } from "@/hooks/core";
import { baseStyle } from "@/styles/baseStyle";
import { coreStyles } from "@/styles/core";

const { actionButton } = coreStyles;

type TIconName =
  | "play"
  | "pause"
  | "repeat"
  | "plus"
  | "message-text"
  | "camera-flip"
  | "flash"
  | "flash-off"
  | "none";
type TVariants = "primary" | "secondary";

type ActionButtonProps = {
  variant: TVariants;
  active: boolean;
  disabled?: boolean;
  iconName: TIconName;
  style: StyleProp<ViewStyle>;
  img_uri?: string;
  fn: () => void;
} & TouchableOpacityProps;

export default function ActionButton({
  variant,
  active,
  disabled,
  iconName,
  style,
  img_uri,
  fn,
  ...rest
}: ActionButtonProps) {
  const theme = useTheme();
  const buttonSize = variant === "primary" ? baseStyle.sizeXL : baseStyle.sizeLG;
  const iconSize = variant === "primary" ? baseStyle.sizeLG : baseStyle.sizeMD;
  const backgroudColor = variant === "primary" ? theme.primary : theme.container;

  if (!active) return null;

  return (
    <TouchableOpacity
      disabled={disabled}
      testID="action-button"
      onPress={active && fn}
      style={[actionButton, buttonSize, { backgroundColor: backgroudColor }, style]}
      {...rest}>
      {iconName !== "none" ? (
        <MaterialCommunityIcons name={iconName} size={iconSize.height} color="white" />
      ) : (
        <Image source={img_uri} style={[baseStyle.sizeLG, baseStyle.roundedFull]} />
      )}
    </TouchableOpacity>
  );
}
