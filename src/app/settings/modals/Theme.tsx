import { FlatList } from "react-native";

import { ThemedView } from "@/components/core";
import { SettingsField } from "@/components/settings";
import { useThemeStore } from "@/store/core";
import { baseStyle } from "@/styles/baseStyle";
import { Colors } from "@/theme";

export default function Theme() {
  const themeSettings = [{ name: "Dark Mode", toggle: true, icon: "" }];
  const { isDark, toggleMode } = useThemeStore();

  return (
    <ThemedView style={[baseStyle.flexGrow, baseStyle.paddingLG]}>
      <FlatList
        data={themeSettings}
        renderItem={({ item, index }) => (
          <SettingsField
            setting={item}
            isFirst={index === 0}
            isLast={index === themeSettings.length - 1}
            onPress={() => toggleMode(Colors)}
            switchProps={{ value: isDark, onValueChange: () => toggleMode(Colors) }}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </ThemedView>
  );
}
