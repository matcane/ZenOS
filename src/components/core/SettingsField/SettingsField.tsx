import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, PressableProps, Image, Switch, SwitchProps } from "react-native";

import { SETTINGS_ICON, TSettingField, APPS_ICON } from "@/constants/core";
import { useTheme } from "@/hooks/core";
import { baseStyle } from "@/styles/baseStyle";
import { coreStyles } from "@/styles/core";

import ThemedText from "../ThemedText/ThemedText";

const { sizeMD, flexGrow } = baseStyle;
const { settingsFieldIcon, settingsFieldItem, firstSettingsFieldItem, lastSettingsFieldItem } =
  coreStyles;

const Icon = { ...APPS_ICON, ...SETTINGS_ICON };

type SettingsFieldProps = PressableProps & {
  setting: TSettingField;
  isFirst: boolean;
  isLast: boolean;
  switchProps?: SwitchProps;
};

const SwitchOrChevron = ({
  toggle,
  switchProps,
  theme,
}: {
  toggle?: boolean;
  switchProps?: SwitchProps;
  theme: any;
}) => {
  return toggle ? (
    <Switch {...switchProps} />
  ) : (
    <MaterialCommunityIcons name="chevron-right" size={sizeMD.height} color={theme.text} />
  );
};

const IconRenderer = ({ icon }: { icon?: string }) => {
  return icon ? <Image source={Icon[icon]} style={settingsFieldIcon} /> : null;
};

export default function SettingsField({
  setting,
  isFirst,
  isLast,
  switchProps,
  ...rest
}: SettingsFieldProps) {
  const theme = useTheme();

  const containerStyles = [
    { backgroundColor: theme.container },
    settingsFieldItem,
    isFirst && firstSettingsFieldItem,
    isLast && lastSettingsFieldItem,
  ];

  return (
    <Pressable style={containerStyles} {...rest}>
      <IconRenderer icon={setting.icon} />
      <ThemedText style={flexGrow}>{setting.name}</ThemedText>
      <SwitchOrChevron toggle={setting.toggle} switchProps={switchProps} theme={theme} />
    </Pressable>
  );
}
