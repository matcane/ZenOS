export type TButton = {
  iconName: string;
  char: string;
  action: string;
};

export const BUTTONS = [
  { iconName: "c", char: "", action: "clearAll" },
  { iconName: "percent", char: "%", action: "" },
  { iconName: "delete-left", char: "", action: "clearLast" },
  { iconName: "", char: "/", action: "" },
  { iconName: "7", char: "7", action: "" },
  { iconName: "8", char: "8", action: "" },
  { iconName: "9", char: "9", action: "" },
  { iconName: "xmark", char: "x", action: "" },
  { iconName: "4", char: "4", action: "" },
  { iconName: "5", char: "5", action: "" },
  { iconName: "6", char: "6", action: "" },
  { iconName: "minus", char: "-", action: "" },
  { iconName: "1", char: "1", action: "" },
  { iconName: "2", char: "2", action: "" },
  { iconName: "3", char: "3", action: "" },
  { iconName: "plus", char: "+", action: "" },
  { iconName: "0", char: "0", action: "" },
  { iconName: "", char: ".", action: "" },
  { iconName: "equals", char: "", action: "calculate" },
];

export const SPECIAL_BUTTONS = ["/", "x", "-", "=", "%", "+", "."];
