module.exports = {
  expo: {
    name: "ZenOS",
    slug: "zenos",
    version: "1.0.0",
    orientation: "portrait",
    platforms: ["android"],
    icon: "./assets/images/icon.png",
    scheme: "zenos",
    userInterfaceStyle: "dark",
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#000000",
      },
      splash: {
        image: "./assets/images/splash.png",
        resizeMode: "contain",
        backgroundColor: "#000000",
      },
      package: "com.matcane.zenos",
    },
    plugins: [
      "expo-router",
      [
        "expo-build-properties",
        {
          android: {
            enablePngCrunchInReleaseBuilds: true,
            enableProguardInReleaseBuilds: true,
            enableShrinkResourcesInReleaseBuilds: true,
            useLegacyPackaging: true,
          },
        },
      ],
      [
        "expo-navigation-bar",
        {
          position: "absolute",
          visibility: "hidden",
          behavior: "overlay-swipe",
          backgroundColor: "#000000",
        },
      ],
    ],
    extra: {
      eas: {
        projectId: process.env.EAS_BUILD_PROJECT_ID,
      },
    },
  },
};
