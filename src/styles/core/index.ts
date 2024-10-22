import { StyleSheet } from "react-native";

import { baseStyle } from "../baseStyle";

export const coreStyles = StyleSheet.create({
  actionButton: {
    ...baseStyle.absolute,
    ...baseStyle.roundedFull,
    ...baseStyle.justifyCenter,
    ...baseStyle.itemsCenter,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },

  container: {
    ...baseStyle.paddingXL,
    ...baseStyle.itemsCenter,
  },

  navigationBarContainer: {
    ...baseStyle.justifyEvenly,
    ...baseStyle.itemsCenter,
    ...baseStyle.flexRow,
    height: 45,
    gap: 20,
  },

  backNavButton: { transform: [{ rotate: "30deg" }] },

  statusBarContainer: {
    ...baseStyle.absolute,
    ...baseStyle.flexRow,
    ...baseStyle.justifyBetween,
    ...baseStyle.itemsCenter,
    ...baseStyle.paddingHorizontalMD,
    height: 32,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  },

  statusBarIcons: {
    ...baseStyle.flexRow,
    gap: 2,
  },

  wallpaper: {
    ...baseStyle.flexGrow,
    ...baseStyle.justifyCenter,
    ...baseStyle.paddingTopXL,
  },
});
