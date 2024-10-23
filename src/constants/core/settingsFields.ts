import { TApp } from "./apps";

export type TSettingField = Omit<TApp, "slug" | "version" | "navigationBar"> & {
  toggle?: boolean;
  path?: string;
};

export const ACCOUNT_FIELDS = [
  { name: "Phone", icon: "@assets/icons/icons8-messages.webp", path: "settings/modals/Phone" },
];

export const CUSTOMIZATION_FIELDS = [
  { name: "Theme", icon: "@assets/icons/icons8-paint-palette.webp", path: "settings/modals/Theme" },
];

export const APPS_FIELDS = [
  { name: "App", icon: "@assets/icons/icons8-apps.webp", path: "settings/modals/Apps" },
];

export const OS_FIELDS = [{ name: "Shutdown", icon: "" }];

export const SETTINGS_ICON: Record<string, any> = {
  "@assets/icons/icons8-apps.webp": require("@assets/icons/icons8-apps.webp"),
  "@assets/icons/icons8-paint-palette.webp": require("@assets/icons/icons8-paint-palette.webp"),
  "@assets/icons/icons8-messages.webp": require("@assets/icons/icons8-messages.webp"),
};
