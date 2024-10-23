import { StyleSheet } from "react-native";

export const baseStyle = StyleSheet.create({
  transparent: { backgroundColor: undefined },

  fontXS: { fontSize: 12 },
  fontSM: { fontSize: 16 },
  fontSMD: { fontSize: 24 },
  fontMD: { fontSize: 32 },
  fontLG: { fontSize: 48 },
  fontXL: { fontSize: 64 },
  fontXXL: { fontSize: 128 },

  heightSM: { height: 16 },
  heightMD: { height: 32 },
  heightLG: { height: 48 },
  heightXL: { height: 64 },
  heightXXL: { height: 128 },

  widthSM: { width: 16 },
  widthMD: { width: 32 },
  widthLG: { width: 48 },
  widthXL: { width: 64 },
  widthXXL: { width: 128 },

  sizeSM: { width: 16, height: 16 },
  sizeMD: { width: 32, height: 32 },
  sizeLG: { width: 48, height: 48 },
  sizeXL: { width: 64, height: 64 },

  static: { position: "static" },
  absolute: { position: "absolute" },
  relative: { position: "relative" },

  rounded: { borderRadius: 5 },
  roundedMD: { borderRadius: 10 },
  roundedLG: { borderRadius: 20 },
  roundedFull: { borderRadius: 999 },

  flex: { flex: 1 },
  flexNone: { flex: 0 },
  flexGrow: { flexGrow: 1 },
  flexGrowNone: { flexGrow: 0 },
  flexShrink: { flexShrink: 1 },
  flexShrinkNone: { flexShrink: 0 },

  flexRow: { flexDirection: "row" },
  flexRowReverse: { flexDirection: "row-reverse" },
  flexCol: { flexDirection: "column" },
  flexColReverse: { flexDirection: "column-reverse" },

  paddingSM: { padding: 5 },
  paddingMD: { padding: 10 },
  paddingLG: { padding: 15 },
  paddingXL: { padding: 20 },

  paddingHorizontalSM: { paddingHorizontal: 10 },
  paddingHorizontalMD: { paddingHorizontal: 20 },
  paddingHorizontalLG: { paddingHorizontal: 30 },
  paddingHorizontalXL: { paddingHorizontal: 40 },
  paddingHorizontalXXL: { paddingHorizontal: 90 },

  paddingVerticalSM: { paddingVertical: 10 },
  paddingVerticalMD: { paddingVertical: 20 },
  paddingVerticalLG: { paddingVertical: 30 },
  paddingVerticalXL: { paddingVertical: 40 },
  paddingVerticalXXL: { paddingVertical: 80 },

  paddingTopSM: { paddingTop: 5 },
  paddingTopMD: { paddingTop: 10 },
  paddingTopLG: { paddingTop: 15 },
  paddingTopXL: { paddingTop: 20 },
  paddingTopXXL: { paddingTop: 40 },

  paddingBottomSM: { paddingBottom: 5 },
  paddingBottomMD: { paddingBottom: 10 },
  paddingBottomLG: { paddingBottom: 15 },
  paddingBottomXL: { paddingBottom: 20 },
  paddingBottomXXL: { paddingBottom: 40 },

  paddingLeftSM: { paddingLeft: 5 },
  paddingLeftMD: { paddingLeft: 10 },
  paddingLeftLG: { paddingLeft: 15 },
  paddingLeftXL: { paddingLeft: 20 },
  paddingLeftXXL: { paddingLeft: 40 },

  paddingRightSM: { paddingRight: 5 },
  paddingRightMD: { paddingRight: 10 },
  paddingRightLG: { paddingRight: 15 },
  paddingRightXL: { paddingRight: 20 },
  paddingRightXXL: { paddingRight: 40 },

  marginSM: { margin: 5 },
  marginMD: { margin: 10 },
  marginLG: { margin: 15 },
  marginXL: { margin: 20 },

  marginHorizontalSM: { marginHorizontal: 10 },
  marginHorizontalMD: { marginHorizontal: 20 },
  marginHorizontalLG: { marginHorizontal: 30 },
  marginHorizontalXL: { marginHorizontal: 40 },
  marginHorizontalXXL: { marginHorizontal: 80 },

  marginVerticalSM: { marginVertical: 10 },
  marginVerticalMD: { marginVertical: 20 },
  marginVerticalLG: { marginVertical: 30 },
  marginVerticalXL: { marginVertical: 40 },
  marginVerticalXXL: { marginVertical: 80 },

  marginTopSM: { marginTop: 5 },
  marginTopMD: { marginTop: 10 },
  marginTopLG: { marginTop: 15 },
  marginTopXL: { marginTop: 20 },
  marginTopXXL: { marginTop: 40 },

  marginBottomSM: { marginBottom: 5 },
  marginBottomMD: { marginBottom: 10 },
  marginBottomLG: { marginBottom: 15 },
  marginBottomXL: { marginBottom: 20 },
  marginBottomXXL: { marginBottom: 40 },

  marginLeftSM: { marginLeft: 5 },
  marginLeftMD: { marginLeft: 10 },
  marginLeftLG: { marginLeft: 15 },
  marginLeftXL: { marginLeft: 20 },
  marginLeftXXL: { marginLeft: 40 },

  marginRightSM: { marginRight: 5 },
  marginRightMD: { marginRight: 10 },
  marginRightLG: { marginRight: 15 },
  marginRightXL: { marginRight: 20 },
  marginRightXXL: { marginRight: 40 },

  justifyStart: { justifyContent: "flex-start" },
  justifyEnd: { justifyContent: "flex-end" },
  justifyCenter: { justifyContent: "center" },
  justifyBetween: { justifyContent: "space-between" },
  justifyAround: { justifyContent: "space-around" },
  justifyEvenly: { justifyContent: "space-evenly" },

  contentStart: { alignContent: "flex-start" },
  contentEnd: { alignContent: "flex-end" },
  contentCenter: { alignContent: "center" },
  contentBetween: { alignContent: "space-between" },
  contentAround: { alignContent: "space-around" },
  contentEvenly: { alignContent: "space-evenly" },

  itemsStart: { alignItems: "flex-start" },
  itemsEnd: { alignItems: "flex-end" },
  itemsCenter: { alignItems: "center" },
  itemsBaseline: { alignItems: "baseline" },
  itemsStretch: { alignItems: "stretch" },

  textLeft: { textAlign: "left" },
  textCenter: { textAlign: "center" },
  textRight: { textAlign: "right" },
  textJustify: { textAlign: "justify" },
});
