import { render, fireEvent } from "@testing-library/react-native";

import CalcButton from "../CalcButton";

const ITEM_WIDTH = 50;

const button = {
  iconName: "plus",
  char: "+",
  action: "",
};

const props = {
  button,
  isLast: false,
  itemWidth: ITEM_WIDTH,
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

describe("CalcButton component", () => {
  it("renders correctly", () => {
    const tree = render(<CalcButton {...props} />);

    expect(tree).toMatchSnapshot();
  });

  it("renders icon when iconName is provided", () => {
    const { getByTestId } = render(<CalcButton {...props} />);

    const icon = getByTestId("icon");
    expect(icon).toBeTruthy();
  });

  it("renders text when iconName is not provided", () => {
    const newButton = {
      iconName: "",
      char: "+",
      action: "",
    };

    const { getByTestId } = render(<CalcButton {...props} button={newButton} />);

    const text = getByTestId("text");
    expect(text).toBeTruthy();
    expect(text.props.children).toBe("+");
  });

  it("has correct styles when isLast is true", () => {
    const { getByTestId } = render(<CalcButton {...props} isLast={true} />);

    const buttonContainer = getByTestId("calc-button");
    const style = buttonContainer.props.style;
    expect(style).toEqual([
      { alignItems: "center", padding: 20 },
      { justifyContent: "center" },
      { borderRadius: 999 },
      { margin: 10 },
      { backgroundColor: "#2196f3", height: 30, width: 80 },
    ]);
  });

  it("has correct styles when isLast is false", () => {
    const { getByTestId } = render(<CalcButton {...props} isLast={false} />);

    const buttonContainer = getByTestId("calc-button");
    const style = buttonContainer.props.style;
    expect(style).toEqual([
      { alignItems: "center", padding: 20 },
      { justifyContent: "center" },
      { borderRadius: 999 },
      { margin: 10 },
      { backgroundColor: "#a0a0a0", height: 30, width: 30 },
    ]);
  });

  it("calls onPress when pressed", () => {
    const fn = jest.fn();
    const { getByTestId } = render(<CalcButton {...props} onPress={fn} />);

    const buttonContainer = getByTestId("calc-button");
    fireEvent.press(buttonContainer);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
