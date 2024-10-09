import calc from "@/config/apps/calc.json";
import camera from "@/config/apps/camera.json";
import chrome from "@/config/apps/chrome.json";
import clock from "@/config/apps/clock.json";
import messages from "@/config/apps/messages.json";
import phone from "@/config/apps/phone.json";
import settings from "@/config/apps/settings.json";

type TNavigationBar = {
  backgroundColor: string;
  dark: { backgroundColor: string };
};

export type TApp = {
  name: string;
  slug: string;
  version: string;
  icon: string;
  navigationBar?: TNavigationBar;
};

export const APPS = [settings, calc, clock];

export const PINNED_APPS = [phone, messages, chrome, camera];

export const APPS_ICON: Record<string, any> = {
  "@assets/icons/icons8-settings.webp": require("@assets/icons/icons8-settings.webp"),
  "@assets/icons/icons8-calculator.webp": require("@assets/icons/icons8-calculator.webp"),
  "@assets/icons/icons8-clock.webp": require("@assets/icons/icons8-clock.webp"),
  "@assets/icons/icons8-phone.webp": require("@assets/icons/icons8-phone.webp"),
  "@assets/icons/icons8-messages.webp": require("@assets/icons/icons8-messages.webp"),
  "@assets/icons/icons8-chrome.webp": require("@assets/icons/icons8-chrome.webp"),
  "@assets/icons/icons8-camera.webp": require("@assets/icons/icons8-camera.webp"),
};

export const APPS_ICON_SOURCE: Record<string, any> = {
  "@assets/icons/icons8-settings.webp": "https://icons8.com/icon/4UC7V4crVOgk/settings",
  "@assets/icons/icons8-calculator.webp": "https://icons8.com/icon/w8uA2lyOFNbd/calculator",
  "@assets/icons/icons8-clock.webp": "https://icons8.com/icon/kZYJCScZSxUH/clock",
  "@assets/icons/icons8-phone.webp": "https://icons8.com/icon/8U0YyPNowmTt/phone",
  "@assets/icons/icons8-messages.webp": "https://icons8.com/icon/U2maxZvgoDog/messages",
  "@assets/icons/icons8-chrome.webp": "https://icons8.com/icon/QBljOALaVp01/chrome",
  "@assets/icons/icons8-camera.webp": "https://icons8.com/icon/eKEI8q7Hjioq/camera",
};
