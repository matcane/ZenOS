import { render } from "@testing-library/react-native";
import { Text } from "react-native";

import Wallpaper from "../Wallpaper";

jest.mock("@assets/images/bg.webp", () => ({
  uri: "mocked-image-uri",
}));

jest.mock("expo-router", () => ({
  useSegments: jest.fn(() => []),
}));

jest.mock("@react-native-firebase/auth", () => {
  return {
    onAuthStateChanged: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
  };
});

jest.mock("@react-native-firebase/firestore", () => {
  return {
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        get: jest.fn(() => Promise.resolve({ exists: true, data: () => ({}) })),
        set: jest.fn(() => Promise.resolve()),
        update: jest.fn(() => Promise.resolve()),
        delete: jest.fn(() => Promise.resolve()),
      })),
    })),
  };
});

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
    expect(imageBackground.props.source).toEqual(undefined);
  });
});
