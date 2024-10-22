import { render } from "@testing-library/react-native";

import SettingsFields from "../SettingsField";

const item = {
  name: "Theme",
  icon: "@assets/icons/icons8-paint-palette.webp",
  path: "settings/modals/Theme",
};

describe("SettingsField component", () => {
  it("renders correctly", () => {
    const tree = render(<SettingsFields setting={item} isFirst={true} isLast={false} />);
    expect(tree).toMatchSnapshot();
  });
});
