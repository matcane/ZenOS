import { router } from "expo-router";
import { FlatList } from "react-native";

import { SettingsField, ThemedView } from "@/components/core";
import { APPS, PINNED_APPS } from "@/constants/core";
import { baseStyle } from "@/styles/baseStyle";

const { flexGrow, paddingLG } = baseStyle;

export default function Page() {
  const appList = [...APPS, ...PINNED_APPS];
  return (
    <ThemedView style={[flexGrow, paddingLG]}>
      <FlatList
        data={appList}
        renderItem={({ item, index }) => (
          <SettingsField
            setting={item}
            isFirst={index === 0}
            isLast={index === appList.length - 1}
            onPress={() =>
              router.push({ pathname: "settings/modals/[app]", params: { slug: item.slug } })
            }
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </ThemedView>
  );
}
