import { StyleSheet } from "react-native";

import { baseStyle } from "../baseStyle";

export const settingsStyles = StyleSheet.create({
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
});
