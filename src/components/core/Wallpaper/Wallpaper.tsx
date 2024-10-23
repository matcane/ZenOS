import { useSegments } from "expo-router";
import { PropsWithChildren } from "react";
import { ImageBackground } from "react-native";

import { baseStyle } from "@/styles/baseStyle";
import { coreStyles } from "@/styles/core";

import image from "@assets/images/bg.webp";

import ThemedView from "../ThemedView/ThemedView";

const { wallpaper } = coreStyles;

export default function Wallpaper({ children }: PropsWithChildren) {
  const segments = useSegments();

  if (segments[0] === "sign-in" || segments[0] === "sign-up") {
    return <ThemedView style={[wallpaper, baseStyle.transparent]}>{children}</ThemedView>;
  }

  return (
    <ImageBackground testID="image-background" source={image} resizeMode="cover" style={wallpaper}>
      {children}
    </ImageBackground>
  );
}
