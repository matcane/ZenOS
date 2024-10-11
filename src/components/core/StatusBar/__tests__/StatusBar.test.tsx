import { render } from "@testing-library/react-native";

import { useTheme, useTime } from "@/hooks/core";

import StatusBar from "../StatusBar";

jest.mock("expo-router", () => ({
  useSegments: jest.fn(() => []),
}));

jest.mock("@/hooks/core", () => ({
  useTime: jest.fn(),
  useTheme: jest.fn(),
}));

describe("StatusBar component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    (useTheme as jest.Mock).mockReturnValue({ text: "#000000" });
    (useTime as jest.Mock).mockReturnValue({ currentTime: "00:00" });
    const tree = render(<StatusBar />);
    expect(tree).toMatchSnapshot();
  });
});
