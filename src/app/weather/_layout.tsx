import { Stack } from "expo-router";

import { ThemedText, ThemedView } from "@/components/core";
import { useTheme } from "@/hooks/core";
import { baseStyle } from "@/styles/baseStyle";

export default function WeatherLayout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: theme.background },
      }}>
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
      <Stack.Screen
        name="modals/ManageCity"
        options={{
          headerShown: true,
          presentation: "modal",
          animation: "fade",
          headerTitle: "Manage City",
          headerTintColor: theme.text,
          headerStyle: {
            backgroundColor: theme.background,
          },
        }}
      />

      <Stack.Screen
        name="modals/AddCity"
        options={{
          presentation: "modal",
          animation: "slide_from_bottom",
          header: () => (
            <ThemedView
              style={[
                baseStyle.marginTopXL,
                baseStyle.roundedTopLG,
                baseStyle.justifyCenter,
                baseStyle.itemsCenter,
                {
                  backgroundColor: theme.secondaryContainer,
                  height: 86,
                },
              ]}>
              <ThemedText style={{ fontSize: 22 }}>Add City</ThemedText>
            </ThemedView>
          ),
        }}
      />
    </Stack>
  );
}
