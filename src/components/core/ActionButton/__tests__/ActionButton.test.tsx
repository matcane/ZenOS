import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { render, fireEvent } from "@testing-library/react-native";

import { baseStyle } from "@/styles/baseStyle";
import { Colors } from "@/theme";

import ActionButton from "../ActionButton";

const { sizeMD, sizeLG, sizeXL } = baseStyle;

describe("ActionButton component", () => {
  it("renders correctly", () => {
    const fn = jest.fn();
    const tree = render(
      <ActionButton variant="primary" active={true} iconName="play" style={{}} fn={fn} />,
    );

    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with primary variant", () => {
    const fn = jest.fn();
    const { getByTestId } = render(
      <ActionButton variant="primary" active={true} iconName="play" style={{}} fn={fn} />,
    );
    const button = getByTestId("action-button");
    const buttonIcon = button.findByType(MaterialCommunityIcons);
    expect(button.props.style.backgroundColor).toBe(Colors.light.primary);
    expect(button.props.style.width).toBe(sizeXL.width);
    expect(button.props.style.height).toBe(sizeXL.height);
    expect(buttonIcon.props.size).toBe(sizeLG.height);
  });

  it("renders correctly with secondary variant", () => {
    const fn = jest.fn();
    const { getByTestId } = render(
      <ActionButton variant="secondary" active={true} iconName="pause" style={{}} fn={fn} />,
    );
    const button = getByTestId("action-button");
    const buttonIcon = button.findByType(MaterialCommunityIcons);
    expect(button.props.style.backgroundColor).toBe(Colors.light.container);
    expect(button.props.style.width).toBe(sizeLG.width);
    expect(button.props.style.height).toBe(sizeLG.height);
    expect(buttonIcon.props.size).toBe(sizeMD.height);
  });

  it("does not render when active is false", () => {
    const fn = jest.fn();
    const renderer = render(
      <ActionButton variant="primary" active={false} iconName="play" style={{}} fn={fn} />,
    );
    const root = renderer.root;
    expect(root).toBeUndefined();
  });

  it("calls the function when pressed", () => {
    const fn = jest.fn();
    const { getByTestId } = render(
      <ActionButton variant="primary" active={true} iconName="play" style={{}} fn={fn} />,
    );
    const button = getByTestId("action-button");
    fireEvent.press(button);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
