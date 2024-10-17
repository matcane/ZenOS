import { render } from "@testing-library/react-native";

import { useTheme } from "@/hooks/core";

import StatusBar from "../StatusBar";

jest.mock("expo-router", () => ({
  useSegments: jest.fn(() => []),
}));

jest.mock("@/hooks/core", () => ({
  useTheme: jest.fn(),
}));

describe("StatusBar component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    (useTheme as jest.Mock).mockReturnValue({ text: "#000000" });
    const tree = render(<StatusBar />);
    expect(tree).toMatchSnapshot();
  });
});
