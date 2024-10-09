import { router } from "expo-router";
import { FlatList, View, Pressable, StyleSheet, Dimensions, Image } from "react-native";

import { ThemedText } from "@/components/core/";
import { apps, pinned_apps, TApps, appsIcon } from "@/constants/apps";
import { useThemeColor } from "@/hooks/useTheme";
import useThemeStore from "@/store/themeStore";
import { Colors } from "@/theme";

const screenWidth = Dimensions.get("window").width;

export default function Page() {
  const theme = useThemeColor();
  const numColumns = 4;
  const itemWidth = screenWidth / numColumns;
  const isDark = useThemeStore((state) => state.isDark);

  const setNavBarColor = useThemeStore((state) => state.setNavBarColor);
  const setStatusBarColor = useThemeStore((state) => state.setStatusBarColor);

  const handleNavigation = (item: TApps) => {
    if (item.navigationBar?.backgroundColor && item.navigationBar.dark.backgroundColor) {
      setNavBarColor(
        isDark ? item.navigationBar.dark.backgroundColor : item.navigationBar.backgroundColor,
      );
    } else {
      setNavBarColor(theme.background);
    }
    setStatusBarColor(theme.background);
    router.navigate(item.slug);
  };

  return (
    <>
      <View style={styles.wrapper}>
        <FlatList
          data={apps}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => handleNavigation(item)}
              style={[styles.container, { width: itemWidth }]}>
              <Image source={appsIcon[item.icon]} />
              <ThemedText
                style={{ color: Colors.dark.text, width: itemWidth, textAlign: "center" }}>
                {item.name}
              </ThemedText>
            </Pressable>
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
        />
      </View>
      <View>
        <FlatList
          data={pinned_apps}
          contentContainerStyle={{ alignItems: "center" }}
          renderItem={({ item, index }) => (
            <Pressable disabled style={[styles.container, { width: itemWidth }]}>
              <Image source={appsIcon[item.icon]} />
            </Pressable>
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
  },
  container: {
    padding: 20,
    alignItems: "center",
  },
});
