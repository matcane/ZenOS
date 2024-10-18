import { Stack } from "expo-router";

import { ThemedText, ThemedView } from "@/components/core";
import { useTheme } from "@/hooks/core";

export default function SettingsLayout() {
  const theme = useTheme();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => (
            <ThemedView
              style={{
                height: 86,
                paddingTop: 48,
                paddingLeft: 16,
              }}>
              <ThemedText style={{ fontSize: 22 }}>Settings</ThemedText>
            </ThemedView>
          ),
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
        name="modals/Phone"
        options={{
          presentation: "modal",
          animation: "none",
          headerTitle: "Phone",
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
