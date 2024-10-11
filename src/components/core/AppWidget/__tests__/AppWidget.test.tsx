import { render, fireEvent } from "@testing-library/react-native";

import AppWidget from "../AppWidget";

const app = {
  icon: "@assets/icons/icons8-clock.webp",
  name: "App Name",
  slug: "app-name",
  version: "0.0.1",
};

const ITEM_WIDTH = 100;

describe("AppWidget component", () => {
  it("renders correctly", () => {
    const tree = render(<AppWidget app={app} itemWidth={ITEM_WIDTH} />);

    expect(tree).toMatchSnapshot();
  });

  it("renders the icon", () => {
    const { getByTestId } = render(<AppWidget app={app} itemWidth={ITEM_WIDTH} />);
    const icon = getByTestId("icon");
    expect(icon).toBeTruthy();
  });

  it("renders the app name when onlyIcon is false", () => {
    const { getByText } = render(<AppWidget app={app} itemWidth={ITEM_WIDTH} />);
    const appName = getByText(app.name);
    expect(appName).toBeTruthy();
  });

  it("does not render the app name when onlyIcon is true", () => {
    const { queryByText } = render(<AppWidget app={app} itemWidth={ITEM_WIDTH} onlyIcon />);
    const appName = queryByText(app.name);
    expect(appName).toBeNull();
  });

  it("calls the onPress event when pressed", () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <AppWidget app={app} itemWidth={ITEM_WIDTH} onPress={onPress} />,
    );
    const pressable = getByTestId("pressable");
    fireEvent.press(pressable);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("renders with the correct styles", () => {
    const { getByTestId } = render(<AppWidget app={app} itemWidth={ITEM_WIDTH} />);
    const container = getByTestId("pressable");
    const style = container.props.style;
    expect(style).toEqual(expect.arrayContaining([expect.objectContaining({ width: ITEM_WIDTH })]));
  });
});
