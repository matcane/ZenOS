import { Stack } from "expo-router";

import { Colors } from "@/theme";

export default function CameraLayout() {
  return (
    <Stack
      screenOptions={{
        animation: "none",
        contentStyle: { backgroundColor: Colors.dark.background },
      }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="modals/Preview"
        options={{
          presentation: "modal",
          animation: "none",
          headerTintColor: Colors.dark.text,
          headerStyle: {
            backgroundColor: Colors.dark.background,
          },
        }}
      />
    </Stack>
  );
}
