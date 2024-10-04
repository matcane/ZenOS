import { Slot } from "expo-router";
import * as StatusBar from "expo-status-bar";

StatusBar.setStatusBarHidden(true);

export default function RootLayout() {
  return <Slot />;
}
