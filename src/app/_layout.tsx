import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as StatusBarSettings from "expo-status-bar";
import { useEffect, useState } from "react";

import { NavigationBar, StatusBar, Wallpaper, ThemedView } from "@/components/core";
import { baseStyle } from "@/styles/baseStyle";

SplashScreen.preventAutoHideAsync();

const { flexGrow } = baseStyle;

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
  useEffect(() => {
    const hideSplashScreen = async () => {
      setTimeout(async () => await SplashScreen.hideAsync(), 2000);
    };

    hideSplashScreen();
  }, []);

  return (
    <ThemedView style={flexGrow}>
      <Wallpaper>
        <StatusBar />
        <Slot />
        <NavigationBar />
      </Wallpaper>
    </ThemedView>
  );
}
