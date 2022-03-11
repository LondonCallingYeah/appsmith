import { ButtonVariantTypes } from "components/constants";
import { getTheme, ThemeMode } from "selectors/themeSelectors";
import { escapeSpecialChars, isGradient } from "./WidgetUtils";
import {
  getCustomTextColor,
  getCustomBackgroundColor,
  getCustomHoverColor,
  getHoverColor,
} from "./WidgetUtils";

describe("validate widget utils button style functions", () => {
  const theme = getTheme(ThemeMode.LIGHT);
  // validate getCustomTextColor function
  it("getCustomTextColor - validate empty or undefined background color", () => {
    // background color is undefined
    const result = getCustomTextColor(theme);
    expect(result).toStrictEqual("#FFFFFF");

    // background color is empty string
    const backgroundColor = "";
    const expected = "#FFFFFF";
    const result2 = getCustomTextColor(theme, backgroundColor);
    expect(result2).toStrictEqual(expected);
  });

  it("getCustomTextColor - validate text color in case of dark or light background color", () => {
    // background color is dark
    const blueBackground = "#3366FF";
    const expected1 = "#FFFFFF";
    const result1 = getCustomTextColor(theme, blueBackground);
    expect(result1).toStrictEqual(expected1);

    // background color is light
    const yellowBackground = "#FFC13D";
    const expected2 = "#333";
    const result2 = getCustomTextColor(theme, yellowBackground);
    expect(result2).toStrictEqual(expected2);
  });

  // validate getCustomBackgroundColor function
  it("getCustomBackgroundColor - validate empty or undefined background color", () => {
    const expected = "none";
    const result = getCustomBackgroundColor();
    expect(result).toStrictEqual(expected);
  });

  it("getCustomBackgroundColor - validate background color with primary button variant", () => {
    const backgroundColor = "#03b365";
    const expected = "#03b365";
    const result = getCustomBackgroundColor(
      ButtonVariantTypes.PRIMARY,
      backgroundColor,
    );
    expect(result).toStrictEqual(expected);
  });

  it("getCustomBackgroundColor - validate background color with secondary button variant", () => {
    const backgroundColor = "#03b365";
    const expected = "none";
    const result = getCustomBackgroundColor(
      ButtonVariantTypes.SECONDARY,
      backgroundColor,
    );
    expect(result).toStrictEqual(expected);
  });

  // validate getCustomHoverColor function
  it("getCustomHoverColor - validate empty or undefined background color or variant", () => {
    // background color and variant is both are undefined
    const expected = "#00693B";
    const result = getCustomHoverColor(theme);
    expect(result).toStrictEqual(expected);

    // variant is undefined
    const backgroundColor = "#03b365";
    const expected1 = "#028149";
    const result1 = getCustomHoverColor(theme, undefined, backgroundColor);
    expect(result1).toStrictEqual(expected1);
  });

  // validate getCustomHoverColor function
  it("getCustomHoverColor - validate hover color for different variant", () => {
    const backgroundColor = "#03b365";
    // variant : PRIMARY
    const expected1 = "#028149";
    const result1 = getCustomHoverColor(
      theme,
      ButtonVariantTypes.PRIMARY,
      backgroundColor,
    );
    expect(result1).toStrictEqual(expected1);

    // variant : PRIMARY without background
    const expected2 = theme.colors.button.primary.primary.hoverColor;
    const result2 = getCustomHoverColor(theme, ButtonVariantTypes.PRIMARY);
    expect(result2).toStrictEqual(expected2);

    // variant : SECONDARY
    const expected3 = "#85fdc8";
    const result3 = getCustomHoverColor(
      theme,
      ButtonVariantTypes.SECONDARY,
      backgroundColor,
    );
    expect(result3).toStrictEqual(expected3);

    // variant : SECONDARY without background
    const expected4 = theme.colors.button.primary.secondary.hoverColor;
    const result4 = getCustomHoverColor(theme, ButtonVariantTypes.SECONDARY);
    expect(result4).toStrictEqual(expected4);

    // variant : TERTIARY
    const expected5 = "#85fdc8";
    const result5 = getCustomHoverColor(
      theme,
      ButtonVariantTypes.TERTIARY,
      backgroundColor,
    );
    expect(result5).toStrictEqual(expected5);

    // variant : TERTIARY without background
    const expected6 = theme.colors.button.primary.tertiary.hoverColor;
    const result6 = getCustomHoverColor(theme, ButtonVariantTypes.TERTIARY);
    expect(result6).toStrictEqual(expected6);
  });

  it("validate escaping special characters", () => {
    const testString = `a\nb\nc
hello! how are you?
`;
    const result = escapeSpecialChars(testString);
    const expectedResult = "a\nb\nc\nhello! how are you?\n";
    expect(result).toStrictEqual(expectedResult);
  });

  // validate getCustomHoverColor function
  it("getCustomHoverColor - validate empty or undefined background color or variant", () => {
    // background color and variant is both are undefined
    const expected = "#00693B";
    const result = getCustomHoverColor(theme);
    expect(result).toStrictEqual(expected);

    // variant is undefined
    const backgroundColor = "#03b365";
    const expected1 = "#028149";
    const result1 = getCustomHoverColor(theme, undefined, backgroundColor);
    expect(result1).toStrictEqual(expected1);
  });

  // validate getHoverColor function
  it("getHoverColor - validate hover color for different variant", () => {
    let expected;
    // if baseColor is undefined
    let inputs = [
      undefined,
      ButtonVariantTypes.PRIMARY,
      ButtonVariantTypes.SECONDARY,
      ButtonVariantTypes.TERTIARY,
    ];

    let outputs = inputs.map((input) => getHoverColor(undefined, input));
    expected = [undefined, undefined, undefined, undefined];
    expect(outputs).toStrictEqual(expected);

    // if baseColor is empty string
    inputs = [
      undefined,
      ButtonVariantTypes.PRIMARY,
      ButtonVariantTypes.SECONDARY,
      ButtonVariantTypes.TERTIARY,
    ];

    outputs = inputs.map((input) => getHoverColor("", input));
    expected = [undefined, undefined, undefined, undefined];
    expect(outputs).toStrictEqual(expected);

    // if baseColor string is wrong color expression, it always returns undefined
    const wrongColors = ["this is not color", "#78", "rgb(3, 2"];
    outputs = wrongColors.map((input) => getHoverColor(input));
    expected = [undefined, undefined, undefined];
    expect(outputs).toStrictEqual(expected);

    // if baseColor exists
    const baseColor = "#03b365";
    inputs = [
      undefined,
      ButtonVariantTypes.PRIMARY,
      ButtonVariantTypes.SECONDARY,
      ButtonVariantTypes.TERTIARY,
    ];
    outputs = inputs.map((input) => getHoverColor(baseColor, input));
    expected = [
      "#039a57",
      "#039a57",
      "rgba(3, 179, 101, 0.1)",
      "rgba(3, 179, 101, 0.1)",
    ];
    expect(outputs).toStrictEqual(expected);
  });

  it("isGradient - check if value is a gradient", () => {
    const input = [
      undefined,
      "",
      "#03b365",
      "linear-gradient(45deg, blue",
      "linear-gradient(45deg, blue, red)",
      "radial-gradient(#ff8a00, #e52e71)",
    ];

    const expected = [false, false, false, false, true, true];

    const result = input.map(isGradient);

    expect(result).toStrictEqual(expected);
  });
});
