import { router, Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as StatusBarSettings from "expo-status-bar";
import { useEffect, useState } from "react";

import { NavigationBar, StatusBar, Wallpaper, ThemedView } from "@/components/core";
import { useUser } from "@/hooks/core";
import { useAuthStore } from "@/store/core";
import { useDateTimeStore } from "@/store/core/dateTimeStore";
import { baseStyle } from "@/styles/baseStyle";

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
  const setDateTime = useDateTimeStore((state) => state.setDateTime);
  const isLoading = useAuthStore((state) => state.isLoading);

  const { user } = useUser();

  useEffect(() => {
    const prepareApp = async () => {
      if (isLoading) return;

      if (!user) {
        router.replace("sign-in");
      } else {
        router.replace("");
      }
    };

    prepareApp();
  }, [isLoading, user]);

  useEffect(() => {
    const hideSplashScreen = async () => {
      setTimeout(async () => await SplashScreen.hideAsync(), 2000);
    };

    hideSplashScreen();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [setDateTime]);

  return (
    <ThemedView style={baseStyle.flexGrow}>
      <Wallpaper>
        <StatusBar />
        <Slot />
        <NavigationBar />
      </Wallpaper>
    </ThemedView>
  );
}
