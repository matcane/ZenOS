import { render } from "@testing-library/react-native";

import SettingsFields from "../SettingsField";

const item = {
  name: "Theme",
  icon: "@assets/icons/icons8-paint-palette.webp",
  path: "settings/modals/Theme",
};

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

describe("SettingsField component", () => {
  it("renders correctly", () => {
    const tree = render(<SettingsFields setting={item} isFirst={true} isLast={false} />);
    expect(tree).toMatchSnapshot();
  });
});
