import { PropsWithChildren } from "react";
import { ImageBackground } from "react-native";

import image from "@assets/images/bg.webp";

export default function Wallpaper({ children }: PropsWithChildren) {
  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={{
        flex: 1,
        justifyContent: "center",
      }}>
      {children}
    </ImageBackground>
  );
}
