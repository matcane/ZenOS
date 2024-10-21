import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Pressable, TouchableOpacityProps } from "react-native";

import { TButton } from "@/constants/calc";
import { useTheme } from "@/hooks/core";
import { baseStyle } from "@/styles/baseStyle";
import { coreStyles } from "@/styles/core";

import ThemedText from "../ThemedText/ThemedText";

const { fontMD, justifyCenter, roundedFull, marginMD } = baseStyle;
const { container } = coreStyles;

type CalcButtonProps = TouchableOpacityProps & {
  button: TButton;
  isLast: boolean;
  itemWidth: number;
};

export default function CalcButton({ isLast, button, itemWidth, ...rest }: CalcButtonProps) {
  const theme = useTheme();

  const isNormal = isNaN(parseInt(button.char));
  const backgroundColor = isLast
    ? theme.primary
    : isNormal
      ? button.char === "."
        ? theme.container
        : theme.secondaryContainer
      : theme.container;
  const width = itemWidth * (isLast ? 2 : 1);

  const iconSize = fontMD.fontSize;

  const additionalStyles = {
    height: itemWidth - marginMD.margin * 2,
    width: width - marginMD.margin * 2,
    backgroundColor: backgroundColor,
  };

  return (
    <Pressable
      testID="calc-button"
      style={[container, justifyCenter, roundedFull, marginMD, additionalStyles]}
      {...rest}>
      {button.iconName ? (
        <FontAwesome6 testID="icon" name={button.iconName} size={iconSize} color={theme.text} />
      ) : (
        <ThemedText testID="text" style={fontMD}>
          {button.char}
        </ThemedText>
      )}
    </Pressable>
  );
}
