import { render } from "@testing-library/react-native";
import { Text } from "react-native";

import image from "@assets/images/bg.webp";

import Wallpaper from "../Wallpaper";

jest.mock("@assets/images/bg.webp", () => ({
  uri: "mocked-image-uri",
}));

jest.mock("expo-router", () => ({
  useSegments: jest.fn(() => []),
}));

describe("Wallpaper component", () => {
  it("renders correctly", () => {
    const { toJSON } = render(<Wallpaper />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders children inside ImageBackground", () => {
    const { getByText } = render(
      <Wallpaper>
        <Text>Test Child</Text>
      </Wallpaper>,
    );

    expect(getByText("Test Child")).toBeTruthy();
  });

  it("sets the correct background image", () => {
    const { getByTestId } = render(
      <Wallpaper>
        <Text>Test Child</Text>
      </Wallpaper>,
    );

    const imageBackground = getByTestId("image-background");
    expect(imageBackground.props.source).toEqual(image);
  });
});
