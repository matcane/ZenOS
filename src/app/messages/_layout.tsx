import { Stack } from "expo-router";

import { ThemedText, ThemedView } from "@/components/core";
import { useTheme } from "@/hooks/core";

export default function MessagesLayout() {
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
              <ThemedText style={{ fontSize: 22 }}>Messages</ThemedText>
            </ThemedView>
          ),
        }}
      />

      <Stack.Screen
        name="modals/ChatStarterModal"
        options={{
          presentation: "modal",
          animation: "none",
          headerTitle: "ChatStarterModal",
          headerTintColor: theme.text,
          headerStyle: {
            backgroundColor: theme.background,
          },
        }}
      />

      <Stack.Screen
        name="modals/[ConversationModal]"
        options={{
          presentation: "modal",
          animation: "none",
          headerTitle: "ConversationModal",
          headerTintColor: theme.text,
          headerStyle: {
            backgroundColor: theme.background,
          },
        }}
      />
    </Stack>
  );
}
