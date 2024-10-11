import { render } from "@testing-library/react-native";

import NavigationBar from "../NavigationBar";

jest.mock("expo-router", () => ({
  useSegments: jest.fn(() => []),
}));

describe("NavigationBar component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const tree = render(<NavigationBar />);
    expect(tree).toMatchSnapshot();
  });
});
