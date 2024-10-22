import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, PressableProps, Image, Switch, SwitchProps } from "react-native";

import { ThemedText } from "@/components/core";
import { SETTINGS_ICON, TSettingField, APPS_ICON } from "@/constants/core";
import { useTheme } from "@/hooks/core";
import { baseStyle } from "@/styles/baseStyle";
import { settingsStyles } from "@/styles/settings";

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
    <MaterialCommunityIcons
      name="chevron-right"
      size={baseStyle.sizeMD.height}
      color={theme.text}
    />
  );
};

const IconRenderer = ({ icon }: { icon?: string }) => {
  return icon ? <Image source={Icon[icon]} style={settingsStyles.settingsFieldIcon} /> : null;
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
    settingsStyles.settingsFieldItem,
    isFirst && settingsStyles.firstSettingsFieldItem,
    isLast && settingsStyles.lastSettingsFieldItem,
  ];

  return (
    <Pressable style={containerStyles} {...rest}>
      <IconRenderer icon={setting.icon} />
      <ThemedText style={baseStyle.flexGrow}>{setting.name}</ThemedText>
      <SwitchOrChevron toggle={setting.toggle} switchProps={switchProps} theme={theme} />
    </Pressable>
  );
}
