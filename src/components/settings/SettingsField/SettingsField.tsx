import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, PressableProps, Image, Switch, SwitchProps, TextProps } from "react-native";

import { ThemedText } from "@/components/core";
import { SETTINGS_ICON, TSettingField, APPS_ICON } from "@/constants/core";
import { useTheme } from "@/hooks/core";
import { baseStyle } from "@/styles/baseStyle";
import { settingsStyles } from "@/styles/settings";

const Icon = { ...APPS_ICON, ...SETTINGS_ICON };

type SettingsFieldProps = PressableProps & {
  setting: TSettingField;
  blank?: boolean;
  isFirst: boolean;
  isLast: boolean;
  textProps?: TextProps;
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
  blank,
  isFirst,
  isLast,
  textProps,
  switchProps,
  ...rest
}: SettingsFieldProps) {
  const theme = useTheme();

  const containerStyles = [
    { backgroundColor: theme.container },
    settingsStyles.settingsFieldItem,
    isFirst && settingsStyles.firstSettingsFieldItem,
    isLast && settingsStyles.lastSettingsFieldItem,
    blank && baseStyle.justifyCenter,
  ];

  return (
    <Pressable style={containerStyles} {...rest}>
      {setting.icon && <IconRenderer icon={setting.icon} />}
      <ThemedText style={baseStyle.flexGrow} {...textProps}>
        {setting.name}
      </ThemedText>
      {!blank && (
        <SwitchOrChevron toggle={setting.toggle} switchProps={switchProps} theme={theme} />
      )}
    </Pressable>
  );
}
