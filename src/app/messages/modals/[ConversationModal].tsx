import { Stack, useLocalSearchParams } from "expo-router";

import { ThemedView } from "@/components/core";
import { baseStyle } from "@/styles/baseStyle";

export default function ConversationModal() {
  const { slug } = useLocalSearchParams();
  const headerTitle = Array.isArray(slug) ? slug[0] : slug;
  return (
    <ThemedView style={baseStyle.flexGrow}>
      <Stack.Screen options={{ headerTitle: headerTitle }} />
    </ThemedView>
  );
}
