import Fontisto from "@expo/vector-icons/Fontisto";
import { Tabs } from "expo-router";

import { useThemeColor } from "@/hooks/useTheme";

export default function CalcLayout() {
  const theme = useThemeColor();
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
          title: "Clock",
          tabBarIcon: ({ size, color }) => <Fontisto name="clock" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="stopwatch"
        options={{
          headerShown: false,
          title: "Stopwatch",
          tabBarIcon: ({ size, color }) => <Fontisto name="stopwatch" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
