import { Link, useLocalSearchParams } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import { Image } from "react-native";

import { ThemedText, ThemedView } from "@/components/core";
import { APPS, APPS_ICON, APPS_ICON_SOURCE, PINNED_APPS } from "@/constants/core";
import { useTheme } from "@/hooks/core";
import { baseStyle } from "@/styles/baseStyle";

const { fontSM, fontMD, flexGrow, itemsCenter, paddingBottomXL } = baseStyle;

export default function Page() {
  const theme = useTheme();
  const { slug } = useLocalSearchParams();
  const appList = [...APPS, ...PINNED_APPS];

  const app = appList.find((app) => app.slug === slug);

  if (!app) return null;

  return (
    <ThemedView style={[flexGrow, itemsCenter]}>
      <Image source={APPS_ICON[app.icon]} />
      <ThemedText style={fontMD}>{app.name}</ThemedText>
      <ThemedText style={[fontSM, flexGrow]}>{app.version}</ThemedText>
      <ThemedText style={paddingBottomXL}>
        <Link
          target="_blank"
          style={{ color: theme.primary }}
          href={APPS_ICON_SOURCE[app.icon]}
          onPress={async (event) => {
            event.preventDefault();
            await openBrowserAsync(APPS_ICON_SOURCE[app.icon]);
          }}>
          {app.name}
        </Link>
        <ThemedText> icon by </ThemedText>
        <Link
          target="_blank"
          href="https://icons8.com"
          style={{ color: theme.primary }}
          onPress={async (event) => {
            event.preventDefault();
            await openBrowserAsync("https://icons8.com");
          }}>
          icons8
        </Link>
      </ThemedText>
    </ThemedView>
  );
}
