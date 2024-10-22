import { render } from "@testing-library/react-native";

import NavigationBar from "../NavigationBar";

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

describe("NavigationBar component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const tree = render(<NavigationBar />);
    expect(tree).toMatchSnapshot();
  });
});
