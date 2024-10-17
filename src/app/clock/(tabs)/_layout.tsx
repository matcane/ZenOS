import Fontisto from "@expo/vector-icons/Fontisto";
import { Tabs } from "expo-router";

import { useTheme } from "@/hooks/core";

export default function ClockTabs() {
  const theme = useTheme();
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: theme.container },
        tabBarActiveTintColor: theme.invBackground,
      }}>
      <Tabs.Screen
        name="clock"
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => <Fontisto name="clock" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="stopwatch"
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => <Fontisto name="stopwatch" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
