import { StyleSheet, View, Switch, FlatList } from "react-native";

import { ThemedText } from "@/components/core";
import { useThemeColor } from "@/hooks/useTheme";
import useThemeStore from "@/store/themeStore";
import { Colors } from "@/theme";

export default function Theme() {
  const theme = useThemeColor();
  const themeSettings = [{ name: "Dark Mode", toogle: true }];
  const { isDark, toggleMode } = useThemeStore();

  return (
    <FlatList
      data={themeSettings}
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={{ padding: 15 }}
      renderItem={({ item, index }) => (
        <View
          style={[
            { backgroundColor: theme.container },
            styles.item,
            index === 0 ? styles.firstItem : undefined,
            index === themeSettings.length - 1 ? styles.lastItem : undefined,
          ]}>
          <ThemedText style={{ flex: 1 }}>{item.name}</ThemedText>
          <Switch onValueChange={() => toggleMode(Colors)} value={isDark} />
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}
const styles = StyleSheet.create({
  item: {
    height: 40,
    gap: 10,
    paddingLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 1,
  },
  firstItem: {
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  lastItem: {
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
});
