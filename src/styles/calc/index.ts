import { StyleSheet } from "react-native";

import { baseStyle } from "../baseStyle";

export const calcStyles = StyleSheet.create({
  calcDisplay: {
    ...baseStyle.itemsEnd,
    ...baseStyle.justifyEnd,
    ...baseStyle.paddingBottomXL,
  },

  calcDisplayText: { ...baseStyle.paddingHorizontalMD },
});
