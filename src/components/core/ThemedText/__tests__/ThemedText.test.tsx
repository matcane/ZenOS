import { render } from "@testing-library/react-native";

import { useTheme } from "@/hooks/core";
import { baseStyle } from "@/styles/baseStyle";

import ThemedText from "../ThemedText";

jest.mock("@/hooks/core", () => ({
  useTheme: jest.fn(),
}));

const { fontSM } = baseStyle;

describe("ThemedText component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    (useTheme as jest.Mock).mockReturnValue({ text: "#000" });

    const { toJSON } = render(<ThemedText />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("applies the correct text color from the theme", () => {
    const mockTheme = { text: "#ff0000" };
    (useTheme as jest.Mock).mockReturnValue(mockTheme);

    const { getByTestId } = render(<ThemedText testID="themed-text" />);

    const themedText = getByTestId("themed-text");
    expect(themedText.props.style).toContainEqual({ color: mockTheme.text });
  });

  it("applies additional styles passed via props", () => {
    (useTheme as jest.Mock).mockReturnValue({ text: "#000" });

    const { getByTestId } = render(<ThemedText style={fontSM} testID="themed-text" />);

    const themedText = getByTestId("themed-text");
    expect(themedText.props.style).toContainEqual(fontSM);
  });

  it("renders children correctly", () => {
    (useTheme as jest.Mock).mockReturnValue({ text: "#000" });

    const { getByText } = render(<ThemedText>Child text</ThemedText>);

    expect(getByText("Child text")).toBeTruthy();
  });
});
