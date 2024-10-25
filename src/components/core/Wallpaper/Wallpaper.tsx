import { PropsWithChildren } from "react";
import { ImageBackground } from "react-native";

import { useWallpaperStore } from "@/store/core";
import { baseStyle } from "@/styles/baseStyle";
import { coreStyles } from "@/styles/core";

import image from "@assets/images/bg.webp";

import ThemedView from "../ThemedView/ThemedView";

const { wallpaper } = coreStyles;

export default function Wallpaper({ children }: PropsWithChildren) {
  const isWallpaperHidden = useWallpaperStore((state) => state.isWallpaperHidden);

  if (isWallpaperHidden) {
    return (
      <ThemedView testID="image-background" style={[wallpaper, baseStyle.transparent]}>
        {children}
      </ThemedView>
    );
  }

  return (
    <ImageBackground testID="image-background" source={image} resizeMode="cover" style={wallpaper}>
      {children}
    </ImageBackground>
  );
}
