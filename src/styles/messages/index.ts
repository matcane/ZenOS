import { StyleSheet } from "react-native";

import { baseStyle } from "../baseStyle";

export const messagesStyles = StyleSheet.create({
  chatInputContainer: {
    ...baseStyle.absolute,
    ...baseStyle.flexRow,
    ...baseStyle.itemsCenter,
    columnGap: 20,
    bottom: 0,
  },
  chatInput: {
    ...baseStyle.paddingLeftLG,
    ...baseStyle.marginLeftLG,
    ...baseStyle.flexGrow,
    ...baseStyle.roundedLG,
  },
  chatInputButton: {
    ...baseStyle.paddingMD,
    ...baseStyle.marginVerticalSM,
    ...baseStyle.marginRightLG,
    ...baseStyle.roundedMD,
  },
  chatMessage: {
    maxWidth: "90%",
    ...baseStyle.textLeft,
    ...baseStyle.roundedLG,
    ...baseStyle.paddingLG,
  },
  chatMessageInfoButton: {
    ...baseStyle.justifyAround,
    ...baseStyle.marginLG,
    ...baseStyle.roundedLG,
    ...baseStyle.heightXL,
    ...baseStyle.flexRow,
  },
  chatMessageInfoAvatar: {
    ...baseStyle.transparent,
    ...baseStyle.paddingSM,
    ...baseStyle.marginLeftSM,
  },
  chatMessageInfoBody: {
    ...baseStyle.flexRow,
    ...baseStyle.justifyBetween,
    ...baseStyle.transparent,
    ...baseStyle.marginRightMD,
  },
  newMessage: { right: "5%", bottom: "2%" },
});
