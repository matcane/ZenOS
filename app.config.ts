const isEasBuild = process.env.EAS_BUILD === "true";

module.exports = {
  expo: {
    name: "ZenOS",
    slug: "zenos",
    version: "0.0.1",
    orientation: "portrait",
    platforms: ["android"],
    icon: "./assets/images/icon.png",
    scheme: "zenos",
    userInterfaceStyle: "dark",
    androidStatusBar: {
      hidden: true,
      barStyle: "light-content",
      backgroundColor: "#000000",
    },
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
      googleServicesFile: isEasBuild ? process.env.GOOGLE_SERVICES_JSON : "./google-services.json",
    },
    plugins: [
      "@react-native-firebase/app",
      "@react-native-firebase/auth",
      "./withAndroidDisplayCutout.js",
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
      [
        "expo-camera",
        {
          cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
          microphonePermission: "Allow $(PRODUCT_NAME) to access your microphone",
          recordAudioAndroid: true,
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
