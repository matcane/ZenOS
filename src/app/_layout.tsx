import { Slot, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as StatusBarSettings from "expo-status-bar";
import { useEffect, useState } from "react";
import { View } from "react-native";

import { NavigationBar, StatusBar, Wallpaper } from "@/components/core";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, setLoaded] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      StatusBarSettings.setStatusBarHidden(true);
      setLoaded(true);
    };

    prepareApp();
  }, []);

  useEffect(() => {
    if (loaded) {
      setAppIsReady(true);
    }
  }, [loaded]);

  if (!appIsReady) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const segments = useSegments();
  console.log(segments);

  useEffect(() => {
    const hideSplashScreen = async () => {
      setTimeout(async () => await SplashScreen.hideAsync(), 2000);
    };

    hideSplashScreen();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Wallpaper>
        <StatusBar />
        <Slot />
        <NavigationBar />
      </Wallpaper>
    </View>
  );
}
