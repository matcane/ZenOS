import { Pressable, PressableProps, Image } from "react-native";

import { APPS_ICON, TApp } from "@/constants/core";
import { baseStyle } from "@/styles/baseStyle";
import { coreStyles } from "@/styles/core";
import { Colors } from "@/theme";

import ThemedText from "../ThemedText/ThemedText";

const { textCenter } = baseStyle;
const { container } = coreStyles;

type AppWidgetProps = PressableProps & {
  app: TApp;
  itemWidth: number;
  onlyIcon?: boolean;
};

export default function AppWidget({ app, itemWidth, onlyIcon, ...rest }: AppWidgetProps) {
  const additionalStyles = { color: Colors.dark.text, width: itemWidth };
  return (
    <Pressable testID="pressable" style={[container, { width: itemWidth }]} {...rest}>
      <Image source={APPS_ICON[app.icon]} testID="icon" />
      {onlyIcon ? undefined : (
        <ThemedText style={[textCenter, additionalStyles]} numberOfLines={1}>
          {app.name}
        </ThemedText>
      )}
    </Pressable>
  );
}
