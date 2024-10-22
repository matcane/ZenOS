import { Dimensions, FlatList } from "react-native";

import { ThemedView, AppWidget } from "@/components/core";
import { APPS, PINNED_APPS } from "@/constants/core";
import { useNav } from "@/hooks/core/useNav";
import { baseStyle } from "@/styles/baseStyle";

const screenWidth = Dimensions.get("window").width;
const numColumns = 4;
const itemWidth = screenWidth / numColumns;

export default function Page() {
  const { handleNavigation } = useNav();

  return (
    <>
      <ThemedView style={[baseStyle.flexGrow, baseStyle.transparent, baseStyle.paddingTopXL]}>
        <FlatList
          data={APPS}
          renderItem={({ item, index }) => (
            <AppWidget app={item} itemWidth={itemWidth} onPress={() => handleNavigation(item)} />
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
        />
      </ThemedView>
      <ThemedView style={baseStyle.transparent}>
        <FlatList
          data={PINNED_APPS}
          renderItem={({ item, index }) => (
            <AppWidget
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
