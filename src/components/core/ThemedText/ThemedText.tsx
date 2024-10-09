import { Text, TextProps } from "react-native";

import { useThemeColor } from "@/hooks/useTheme";

export default function ThemedText({ style, ...rest }: TextProps) {
  const theme = useThemeColor();

  return <Text style={[{ color: theme.text }, style]} {...rest} />;
}
