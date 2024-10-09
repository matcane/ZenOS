import { TApp } from "./apps";

export type TSettingField = Omit<TApp, "slug" | "version" | "navigationBar"> & {
  toggle?: boolean;
  path?: string;
};

export const SETTINGS_FIELDS = [
  { name: "Theme", icon: "@assets/icons/icons8-paint-palette.webp", path: "settings/modals/Theme" },
  { name: "App", icon: "@assets/icons/icons8-apps.webp", path: "settings/modals/Apps" },
];

export const SETTINGS_ICON: Record<string, any> = {
  "@assets/icons/icons8-apps.webp": require("@assets/icons/icons8-apps.webp"),
  "@assets/icons/icons8-paint-palette.webp": require("@assets/icons/icons8-paint-palette.webp"),
};
