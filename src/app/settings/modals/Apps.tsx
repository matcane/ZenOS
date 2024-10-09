import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Image } from "react-native";

import { ThemedText } from "@/components/core";
import { apps, pinned_apps, appsIcon } from "@/constants/apps";
import { useThemeColor } from "@/hooks/useTheme";

export default function Apps() {
  const theme = useThemeColor();
  const appList = [...apps, ...pinned_apps];
  return (
    <FlatList
      data={appList}
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={{ padding: 15 }}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() =>
            router.push({ pathname: "settings/modals/[app]", params: { slug: item.slug } })
          }
          style={[
            { backgroundColor: theme.container },
            styles.item,
            index === 0 ? styles.firstItem : undefined,
            index === appList.length - 1 ? styles.lastItem : undefined,
          ]}>
          <Image source={appsIcon[item.icon]} style={{ width: 24, height: 24 }} />
          <ThemedText style={{ flex: 1 }}>{item.name}</ThemedText>
          <MaterialCommunityIcons name="chevron-right" size={24} color={theme.text} />
        </Pressable>
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
