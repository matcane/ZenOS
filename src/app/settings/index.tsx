import auth from "@react-native-firebase/auth";
import * as Application from "expo-application";
import { Link, router } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import { FlatList } from "react-native";

import { ThemedText, ThemedView } from "@/components/core";
import { SettingsField } from "@/components/settings";
import { ACCOUNT_FIELDS, CUSTOMIZATION_FIELDS, APPS_FIELDS, OS_FIELDS } from "@/constants/core";
import { useTheme } from "@/hooks/core";
import { baseStyle } from "@/styles/baseStyle";

export default function Page() {
  const theme = useTheme();
  const osInfo = `${Application.applicationName} ${Application.nativeApplicationVersion}`;

  return (
    <ThemedView style={[baseStyle.flexGrow, baseStyle.paddingLG]}>
      <FlatList
        data={ACCOUNT_FIELDS}
        style={[baseStyle.flexGrowNone, baseStyle.paddingBottomMD]}
        renderItem={({ item, index }) => (
          <SettingsField
            setting={item}
            isFirst={index === 0}
            isLast={index === ACCOUNT_FIELDS.length - 1}
            onPress={() => router.navigate(item.path)}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <FlatList
        data={CUSTOMIZATION_FIELDS}
        style={[baseStyle.flexGrowNone, baseStyle.paddingBottomMD]}
        renderItem={({ item, index }) => (
          <SettingsField
            setting={item}
            isFirst={index === 0}
            isLast={index === CUSTOMIZATION_FIELDS.length - 1}
            onPress={() => router.navigate(item.path)}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <FlatList
        data={APPS_FIELDS}
        style={[baseStyle.flexGrow, baseStyle.paddingBottomMD]}
        renderItem={({ item, index }) => (
          <SettingsField
            setting={item}
            isFirst={index === 0}
            isLast={index === APPS_FIELDS.length - 1}
            onPress={() => router.navigate(item.path)}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <ThemedView>
        <SettingsField
          blank
          setting={OS_FIELDS[0]}
          isFirst={true}
          isLast={true}
          onPress={() => auth().signOut()}
          textProps={{ style: { color: theme.textWarn } }}
        />
      </ThemedView>
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
