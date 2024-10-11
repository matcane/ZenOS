import { render } from "@testing-library/react-native";
import { Text } from "react-native";

import { useTheme } from "@/hooks/core";

import ThemedView from "../ThemedView";

jest.mock("@/hooks/core", () => ({
  useTheme: jest.fn(),
}));

describe("ThemedView component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    (useTheme as jest.Mock).mockReturnValue({ background: "#fff" });
    const { toJSON } = render(<ThemedView />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("applies the correct background color from the theme", () => {
    const mockTheme = { background: "#f0f0f0" };
    (useTheme as jest.Mock).mockReturnValue(mockTheme);

    const { getByTestId } = render(<ThemedView testID="themed-view" />);

    const themedView = getByTestId("themed-view");
    expect(themedView.props.style).toContainEqual({ backgroundColor: mockTheme.background });
  });

  it("applies additional styles passed via props", () => {
    (useTheme as jest.Mock).mockReturnValue({ background: "#fff" });

    const { getByTestId } = render(<ThemedView style={{ padding: 10 }} testID="themed-view" />);

    const themedView = getByTestId("themed-view");
    expect(themedView.props.style).toContainEqual({ padding: 10 });
  });

  it("renders children correctly", () => {
    (useTheme as jest.Mock).mockReturnValue({ background: "#fff" });

    const { getByText } = render(
      <ThemedView>
        <Text>Child content</Text>
      </ThemedView>,
    );

    expect(getByText("Child content")).toBeTruthy();
  });
});
