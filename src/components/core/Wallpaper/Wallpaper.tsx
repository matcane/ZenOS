import { useSegments } from "expo-router";
import { PropsWithChildren } from "react";
import { ImageBackground, View } from "react-native";

import { baseStyle } from "@/styles/baseStyle";
import { coreStyles } from "@/styles/core";

import image from "@assets/images/bg.webp";

const { wallpaper } = coreStyles;

export default function Wallpaper({ children }: PropsWithChildren) {
  const segments = useSegments();

  if (
    (segments.length === 1 && segments[0] === "sign-in") ||
    segments[0] === "sign-up" ||
    segments[0] === "camera"
  )
    return <View style={[wallpaper, baseStyle.transparent]}>{children}</View>;

  return (
    <ImageBackground testID="image-background" source={image} resizeMode="cover" style={wallpaper}>
      {children}
    </ImageBackground>
  );
}
