import auth from "@react-native-firebase/auth";
import * as Application from "expo-application";
import { Link, router } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import { FlatList, Pressable } from "react-native";

import { ThemedText, ThemedView } from "@/components/core";
import { SettingsField } from "@/components/settings";
import { SETTINGS_FIELDS } from "@/constants/core";
import { useTheme } from "@/hooks/core";
import { baseStyle } from "@/styles/baseStyle";

export default function Page() {
  const theme = useTheme();
  const osInfo = `${Application.applicationName} ${Application.nativeApplicationVersion}`;

  return (
    <ThemedView style={[baseStyle.flexGrow, baseStyle.paddingLG]}>
      <FlatList
        data={SETTINGS_FIELDS}
        renderItem={({ item, index }) => (
          <SettingsField
            setting={item}
            isFirst={index === 0}
            isLast={index === SETTINGS_FIELDS.length - 1}
            onPress={() => router.navigate(item.path)}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Pressable
        onPress={() => auth().signOut()}
        style={{
          backgroundColor: theme.primary,
          borderRadius: 99,
          height: 32,
          justifyContent: "center",
        }}>
        <ThemedText style={baseStyle.textCenter}>Shutdown</ThemedText>
      </Pressable>
      <ThemedView style={[baseStyle.itemsCenter, baseStyle.paddingTopLG]}>
        <ThemedText>{osInfo}</ThemedText>
        <ThemedText style={baseStyle.flexGrow}>
          Icons by{" "}
          <Link
            target="_blank"
            style={{ color: theme.primary }}
            href="https://icons8.com"
            onPress={async (event) => {
              event.preventDefault();
              await openBrowserAsync("https://icons8.com");
            }}>
            icons8
          </Link>
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}
