import { Stack } from "expo-router";

import { useTheme } from "@/hooks/core";

export default function WeatherLayout() {
  const theme = useTheme();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShadowVisible: false,
          headerTitle: "",
          headerTintColor: theme.text,
          headerStyle: {
            backgroundColor: theme.background,
          },
        }}
      />
    </Stack>
  );
}
