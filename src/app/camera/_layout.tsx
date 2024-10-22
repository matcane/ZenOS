import { Stack } from "expo-router";

import { useTheme } from "@/hooks/core";

export default function CameraLayout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: theme.background },
      }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="modals/Preview"
        options={{
          presentation: "modal",
          animation: "none",
          headerTintColor: theme.text,
          headerStyle: {
            backgroundColor: theme.background,
          },
        }}
      />
    </Stack>
  );
}
