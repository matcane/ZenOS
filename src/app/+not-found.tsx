import Feather from "@expo/vector-icons/Feather";
import { Pressable } from "react-native";

import { SafeArea, ThemedText, ThemedView } from "@/components/core";
import { useTheme } from "@/hooks/core";
import { useNav } from "@/hooks/core/useNav";
import { baseStyle } from "@/styles/baseStyle";

export default function NotFound() {
  const theme = useTheme();
  const { homeNavigation } = useNav();
  return (
    <SafeArea>
      <ThemedView style={[baseStyle.flexGrow, baseStyle.justifyCenter, baseStyle.itemsCenter]}>
        <Feather name="alert-triangle" size={baseStyle.fontXXL.fontSize} color="orange" />
        <ThemedText style={baseStyle.fontMD}>Under construction</ThemedText>
        <Pressable
          onPress={homeNavigation}
          style={[
            baseStyle.marginLG,
            baseStyle.roundedLG,
            baseStyle.paddingHorizontalLG,
            baseStyle.paddingVerticalSM,
            { backgroundColor: theme.primary },
          ]}>
          <ThemedText>Go back</ThemedText>
        </Pressable>
      </ThemedView>
    </SafeArea>
  );
}
