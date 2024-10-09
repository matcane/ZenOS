import { router } from "expo-router";
import { Dimensions, FlatList } from "react-native";

import { ThemedView, AppWidget } from "@/components/core";
import { APPS, PINNED_APPS, TApp } from "@/constants/core";
import { useTheme } from "@/hooks/core";
import { useThemeStore } from "@/store/core";
import { baseStyle } from "@/styles/baseStyle";

const { flexGrow, transparent } = baseStyle;

const screenWidth = Dimensions.get("window").width;
const numColumns = 4;
const itemWidth = screenWidth / numColumns;

export default function Page() {
  const theme = useTheme();
  const isDark = useThemeStore((state) => state.isDark);

  const setNavBarColor = useThemeStore((state) => state.setNavBarColor);
  const setStatusBarColor = useThemeStore((state) => state.setStatusBarColor);

  const handleNavigation = (item: TApp) => {
    const { navigationBar } = item;

    const navBarColor =
      navigationBar?.backgroundColor && navigationBar.dark?.backgroundColor
        ? isDark
          ? navigationBar.dark.backgroundColor
          : navigationBar.backgroundColor
        : theme.background;

    setNavBarColor(navBarColor);
    setStatusBarColor(theme.background);

    router.navigate(item.slug);
  };

  return (
    <>
      <ThemedView style={[flexGrow, transparent]}>
        <FlatList
          data={APPS}
          renderItem={({ item, index }) => (
            <AppWidget app={item} itemWidth={itemWidth} onPress={() => handleNavigation(item)} />
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
        />
      </ThemedView>
      <ThemedView style={transparent}>
        <FlatList
          data={PINNED_APPS}
          renderItem={({ item, index }) => (
            <AppWidget
              disabled
              onlyIcon
              app={item}
              itemWidth={itemWidth}
              onPress={() => handleNavigation(item)}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
        />
      </ThemedView>
    </>
  );
}
