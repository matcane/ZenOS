import { View, ViewProps } from "react-native";

import { useTheme } from "@/hooks/core";

export default function ThemedView({ style, ...rest }: ViewProps) {
  const theme = useTheme();
  const backgroundColor = theme.background;
  return <View style={[{ backgroundColor }, style]} {...rest} />;
}
