import Feather from "@expo/vector-icons/Feather";
import { Pressable, View } from "react-native";

import { useTheme } from "@/hooks/core";
import { useNav } from "@/hooks/core/useNav";
import { baseStyle } from "@/styles/baseStyle";
import { coreStyles } from "@/styles/core";
import { Colors } from "@/theme";

const { sizeSM } = baseStyle;
const { navigationBarContainer, backNavButton } = coreStyles;

export default function NavigationBar() {
  const theme = useTheme();
  const { isRoot, navBarColor, homeNavigation, backNavigation } = useNav();

  const iconSize = sizeSM.height;
  const backgroundColor = isRoot ? undefined : { backgroundColor: navBarColor };
  const navBarButtonHitSlop = {
    bottom: 15,
    left: 20,
    right: 20,
    top: 15,
  };
  const color = isRoot ? Colors.dark.text : theme.text;
  const canBack = !isRoot;

  return (
    <View style={[navigationBarContainer, backgroundColor]}>
      <Feather name="menu" size={iconSize} color={color} />

      <Pressable hitSlop={navBarButtonHitSlop} disabled={!canBack} onPress={homeNavigation}>
        <Feather name="square" size={iconSize} color={color} />
      </Pressable>

      <Pressable hitSlop={navBarButtonHitSlop} disabled={!canBack} onPress={backNavigation}>
        <Feather name="triangle" style={backNavButton} size={iconSize} color={color} />
      </Pressable>
    </View>
  );
}
