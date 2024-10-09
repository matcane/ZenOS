import { StyleSheet } from "react-native";

import { baseStyle } from "../baseStyle";

export const coreStyles = StyleSheet.create({
  calcDisplay: {
    ...baseStyle.itemsEnd,
    ...baseStyle.justifyEnd,
    ...baseStyle.paddingBottomXL,
  },

  calcDisplayText: { ...baseStyle.paddingHorizontalMD },

  stopwatchStartStop: { right: "50%", marginRight: -30, bottom: 0, marginBottom: 30 },

  stopwatchReset: { right: "25%", marginRight: -20, bottom: 0, marginBottom: 35 },

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

  settingsFieldItem: {
    ...baseStyle.paddingLeftMD,
    ...baseStyle.flexRow,
    ...baseStyle.justifyBetween,
    ...baseStyle.itemsCenter,
    ...baseStyle.flexGrow,
    height: 60,
    gap: 10,
  },

  firstSettingsFieldItem: {
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },

  lastSettingsFieldItem: {
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },

  settingsFieldIcon: {
    ...baseStyle.sizeLG,
  },

  statusBarContainer: {
    ...baseStyle.flexRow,
    ...baseStyle.justifyBetween,
    ...baseStyle.itemsCenter,
    height: 20,
    paddingHorizontal: 18,
  },

  statusBarIcons: {
    ...baseStyle.flexRow,
    gap: 2,
  },

  wallpaper: {
    ...baseStyle.flexGrow,
    ...baseStyle.justifyCenter,
  },
});
