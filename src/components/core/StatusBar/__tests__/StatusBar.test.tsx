import { render } from "@testing-library/react-native";

import { useTheme } from "@/hooks/core";

import StatusBar from "../StatusBar";

jest.mock("expo-router", () => ({
  useSegments: jest.fn(() => []),
}));

jest.mock("@/hooks/core", () => ({
  useTheme: jest.fn(),
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
