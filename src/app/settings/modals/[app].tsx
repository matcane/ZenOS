import { Link, useLocalSearchParams } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import { View, Image } from "react-native";

import { ThemedText } from "@/components/core";
import { apps, appsIcon, appsIconSource, pinned_apps } from "@/constants/apps";
import { useThemeColor } from "@/hooks/useTheme";

export default function Page() {
  const theme = useThemeColor();
  const { slug } = useLocalSearchParams();
  const appList = [...apps, ...pinned_apps];

  const app = appList.find((app) => app.slug === slug);
  console.log(app);

  if (!app) return null;

  return (
    <View style={{ flex: 1, backgroundColor: theme.background, alignItems: "center" }}>
      <Image source={appsIcon[app.icon]} />
      <ThemedText style={{ fontSize: 32 }}>{app.name}</ThemedText>
      <ThemedText style={{ fontSize: 18, flex: 1 }}>{app.version}</ThemedText>
      <ThemedText style={{ paddingBottom: 20 }}>
        <Link
          style={{ color: theme.primary }}
          target="_blank"
          href={appsIconSource[app.icon]}
          onPress={async (event) => {
            event.preventDefault();
            await openBrowserAsync(appsIconSource[app.icon]);
          }}>
          {app.name}
        </Link>
        <ThemedText> icon by </ThemedText>
        <Link
          style={{ color: theme.primary }}
          target="_blank"
          href="https://icons8.com"
          onPress={async (event) => {
            event.preventDefault();
            await openBrowserAsync("https://icons8.com");
          }}>
          icons8
        </Link>
      </ThemedText>
    </View>
  );
}
