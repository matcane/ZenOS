import { PropsWithChildren } from "react";

import ThemedView from "../ThemedView/ThemedView";

export default function SafeArea({ children }: PropsWithChildren) {
  return <ThemedView style={{ paddingTop: 32, flexGrow: 1 }}>{children}</ThemedView>;
}
