import { Text, TextProps } from "react-native";

import { useTheme } from "@/hooks/core";
import { baseStyle } from "@/styles/baseStyle";

const { fontSM } = baseStyle;

export default function ThemedText({ style, ...rest }: TextProps) {
  const theme = useTheme();

  return <Text style={[{ color: theme.text }, fontSM, style]} {...rest} />;
}
