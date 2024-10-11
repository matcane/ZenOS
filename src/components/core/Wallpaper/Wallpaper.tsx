import { PropsWithChildren } from "react";
import { ImageBackground } from "react-native";

import { coreStyles } from "@/styles/core";

import image from "@assets/images/bg.webp";

const { wallpaper } = coreStyles;

export default function Wallpaper({ children }: PropsWithChildren) {
  return (
    <ImageBackground testID="image-background" source={image} resizeMode="cover" style={wallpaper}>
      {children}
    </ImageBackground>
  );
}
