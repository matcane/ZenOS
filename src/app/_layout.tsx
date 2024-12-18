import * as FileSystem from "expo-file-system";
import { router, Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

import { NavigationBar, StatusBar, Wallpaper, ThemedView } from "@/components/core";
import { useUser } from "@/hooks/core";
import { useAuthStore, useWallpaperStore } from "@/store/core";
import { useDateTimeStore } from "@/store/core/dateTimeStore";
import { baseStyle } from "@/styles/baseStyle";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, setLoaded] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      const imgFolderUri = `${FileSystem.documentDirectory}camera/images/`;
      const vidFolderUri = `${FileSystem.documentDirectory}camera/videos/`;
      const imgFolderInfo = await FileSystem.getInfoAsync(imgFolderUri);
      const vidFolderInfo = await FileSystem.getInfoAsync(vidFolderUri);
      if (!imgFolderInfo.exists) {
        await FileSystem.makeDirectoryAsync(imgFolderUri, { intermediates: true });
      }
      if (!vidFolderInfo.exists) {
        await FileSystem.makeDirectoryAsync(vidFolderUri, { intermediates: true });
      }
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
  const setIsWallpaperHidden = useWallpaperStore((state) => state.setIsWallpaperHidden);
  const isLoading = useAuthStore((state) => state.isLoading);

  const { user, fetchPhoneNumber } = useUser();

  useEffect(() => {
    const prepareApp = async () => {
      if (isLoading) return;

      if (!user) {
        router.replace("sign-in");
      } else {
        setIsWallpaperHidden(false);
        router.replace("");
      }

      await fetchPhoneNumber();
    };

    prepareApp();
  }, [fetchPhoneNumber, isLoading, setIsWallpaperHidden, user]);

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
