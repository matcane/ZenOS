import { render, fireEvent } from "@testing-library/react-native";

import { baseStyle } from "@/styles/baseStyle";
import { coreStyles } from "@/styles/core";
import { Colors } from "@/theme";

import CalcButton from "../CalcButton";

const { justifyCenter } = baseStyle;
const { container } = coreStyles;

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
    expect(style).toEqual({
      ...container,
      ...justifyCenter,
      opacity: 1,
      height: ITEM_WIDTH,
      width: ITEM_WIDTH * 2,
      backgroundColor: Colors.light.primary,
    });
  });

  it("has correct styles when isLast is false", () => {
    const { getByTestId } = render(<CalcButton {...props} isLast={false} />);

    const buttonContainer = getByTestId("calc-button");
    const style = buttonContainer.props.style;
    expect(style).toEqual({
      ...container,
      ...justifyCenter,
      opacity: 1,
      height: ITEM_WIDTH,
      width: ITEM_WIDTH,
      backgroundColor: Colors.light.container,
    });
  });

  it("calls onPress when pressed", () => {
    const fn = jest.fn();
    const { getByTestId } = render(<CalcButton {...props} onPress={fn} />);

    const buttonContainer = getByTestId("calc-button");
    fireEvent.press(buttonContainer);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
