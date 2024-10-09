import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { TButton } from "@/constants/calc";
import { useTheme } from "@/hooks/core";
import { baseStyle } from "@/styles/baseStyle";
import { coreStyles } from "@/styles/core";

import ThemedText from "../ThemedText/ThemedText";

const { fontMD, justifyCenter } = baseStyle;
const { container } = coreStyles;

type CalcButtonProps = TouchableOpacityProps & {
  button: TButton;
  isLast: boolean;
  index: number;
  itemWidth: number;
};

export default function CalcButton({ isLast, button, index, itemWidth, ...rest }: CalcButtonProps) {
  const theme = useTheme();

  const width = isLast ? itemWidth * 2 : itemWidth;
  const backgroundColor = isLast ? theme.primary : theme.container;

  const iconSize = fontMD;

  const additionalStyles = {
    height: itemWidth,
    width: width,
    backgroundColor: backgroundColor,
  };

  return (
    <TouchableOpacity style={[container, justifyCenter, additionalStyles]} {...rest}>
      {button.iconName ? (
        <FontAwesome6 name={button.iconName} size={iconSize} color={theme.text} />
      ) : (
        <ThemedText style={fontMD}>{button.char}</ThemedText>
      )}
    </TouchableOpacity>
  );
}
