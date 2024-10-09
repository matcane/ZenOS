import { Stack } from "expo-router";

import { useThemeColor } from "@/hooks/useTheme";

export default function SettingsLayout() {
  const theme = useThemeColor();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Settings",
          headerTintColor: theme.text,
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerLargeTitle: true,
        }}
      />
      <Stack.Screen
        name="modals/Theme"
        options={{
          presentation: "modal",
          animation: "none",
          headerTitle: "Theme",
          headerTintColor: theme.text,
          headerStyle: {
            backgroundColor: theme.background,
          },
        }}
      />
      <Stack.Screen
        name="modals/Apps"
        options={{
          presentation: "modal",
          animation: "none",
          headerTitle: "Apps",
          headerTintColor: theme.text,
          headerStyle: {
            backgroundColor: theme.background,
          },
        }}
      />

      <Stack.Screen
        name="modals/[app]"
        options={{
          presentation: "modal",
          animation: "none",
          headerTitle: "App info",
          headerTintColor: theme.text,
          headerStyle: {
            backgroundColor: theme.background,
          },
        }}
      />
    </Stack>
  );
}
