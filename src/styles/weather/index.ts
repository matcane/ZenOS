import { StyleSheet } from "react-native";

import { baseStyle } from "../baseStyle";

export const weatherStyles = StyleSheet.create({
  container: {
    ...baseStyle.flexGrow,
    ...baseStyle.flexRow,
    ...baseStyle.paddingBottomXXL,
    width: "100%",
  },
});
