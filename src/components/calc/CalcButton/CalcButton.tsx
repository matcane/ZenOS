import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Pressable, TouchableOpacityProps } from "react-native";

import { ThemedText } from "@/components/core";
import { TButton } from "@/constants/calc";
import { useTheme } from "@/hooks/core";
import { baseStyle } from "@/styles/baseStyle";
import { coreStyles } from "@/styles/core";

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

  const iconSize = baseStyle.fontMD.fontSize;

  const additionalStyles = {
    height: itemWidth - baseStyle.marginMD.margin * 2,
    width: width - baseStyle.marginMD.margin * 2,
    backgroundColor: backgroundColor,
  };

  return (
    <Pressable
      testID="calc-button"
      style={[
        container,
        baseStyle.justifyCenter,
        baseStyle.roundedFull,
        baseStyle.marginMD,
        additionalStyles,
      ]}
      {...rest}>
      {button.iconName ? (
        <FontAwesome6 testID="icon" name={button.iconName} size={iconSize} color={theme.text} />
      ) : (
        <ThemedText testID="text" style={baseStyle.fontMD}>
          {button.char}
        </ThemedText>
      )}
    </Pressable>
  );
}
