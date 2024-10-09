import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as Application from "expo-application";
import { router } from "expo-router";
import { StyleSheet, FlatList, Pressable, View } from "react-native";

import { ThemedText } from "@/components/core";
import { useThemeColor } from "@/hooks/useTheme";

export default function Page() {
  const theme = useThemeColor();
  const osInfo = `${Application.applicationName} ${Application.nativeApplicationVersion}`;
  const palette_outline = (
    <MaterialCommunityIcons name="palette-outline" size={24} color={theme.text} />
  );
  const apps = <MaterialCommunityIcons name="apps" size={24} color={theme.text} />;

  const settings = [
    { name: "Theme", icon: palette_outline, path: "settings/modals/Theme" },
    { name: "App", icon: apps, path: "settings/modals/Apps" },
  ];

  return (
    <>
      <FlatList
        data={settings}
        contentContainerStyle={{ padding: 15, flex: 1, backgroundColor: theme.background }}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => router.navigate(item.path)}
            style={[
              { backgroundColor: theme.container },
              styles.item,
              index === 0 ? styles.firstItem : undefined,
              index === settings.length - 1 ? styles.lastItem : undefined,
            ]}>
            {item.icon}
            <ThemedText style={{ flex: 1 }}>{item.name}</ThemedText>
            <MaterialCommunityIcons name="chevron-right" size={24} color={theme.text} />
          </Pressable>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View
        style={{
          backgroundColor: theme.background,
          alignItems: "center",
        }}>
        <ThemedText>{osInfo}</ThemedText>
      </View>
    </>
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
