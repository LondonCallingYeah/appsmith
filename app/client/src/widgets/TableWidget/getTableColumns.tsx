import {
  CellLayoutProperties,
  ColumnProperties,
} from "components/designSystems/appsmith/TableComponent/Constants";
import { isBoolean, isObject } from "lodash";

export const getPropertyValue = (
  value: any,
  index: number,
  preserveCase = false,
) => {
  if (value && isObject(value) && !Array.isArray(value)) {
    return value;
  }
  if (value && Array.isArray(value) && value[index]) {
    return preserveCase
      ? value[index].toString()
      : value[index].toString().toUpperCase();
  } else if (value) {
    return preserveCase ? value.toString() : value.toString().toUpperCase();
  } else {
    return value;
  }
};
export const getBooleanPropertyValue = (value: any, index: number) => {
  if (isBoolean(value)) {
    return value;
  }
  if (Array.isArray(value) && isBoolean(value[index])) {
    return value[index];
  }
  return !!value;
};

export const getCellProperties = (
  columnProperties: ColumnProperties,
  rowIndex: number,
) => {
  return {
    horizontalAlignment: getPropertyValue(
      columnProperties.horizontalAlignment,
      rowIndex,
    ),
    verticalAlignment: getPropertyValue(
      columnProperties.verticalAlignment,
      rowIndex,
    ),
    cellBackground: getPropertyValue(columnProperties.cellBackground, rowIndex),
    buttonStyle: getPropertyValue(columnProperties.buttonStyle, rowIndex),
    buttonLabelColor: getPropertyValue(
      columnProperties.buttonLabelColor,
      rowIndex,
    ),
    buttonLabel: getPropertyValue(columnProperties.buttonLabel, rowIndex, true),
    iconName: getPropertyValue(columnProperties.iconName, rowIndex, true),
    buttonVariant: getPropertyValue(
      columnProperties.buttonVariant,
      rowIndex,
      true,
    ),
    borderRadius: getPropertyValue(
      columnProperties.borderRadius,
      rowIndex,
      true,
    ),
    boxShadow: getPropertyValue(columnProperties.boxShadow, rowIndex, true),
    boxShadowColor: getPropertyValue(
      columnProperties.boxShadowColor,
      rowIndex,
      true,
    ),
    iconButtonStyle: getPropertyValue(
      columnProperties.iconButtonStyle,
      rowIndex,
      true,
    ),
    textSize: getPropertyValue(columnProperties.textSize, rowIndex),
    textColor: getPropertyValue(columnProperties.textColor, rowIndex),
    fontStyle: getPropertyValue(columnProperties.fontStyle, rowIndex), //Fix this
    isVisible: getBooleanPropertyValue(columnProperties.isVisible, rowIndex),
    isDisabled: getBooleanPropertyValue(columnProperties.isDisabled, rowIndex),
    isCellVisible: getBooleanPropertyValue(
      columnProperties.isCellVisible,
      rowIndex,
    ),
    displayText: getPropertyValue(columnProperties.displayText, rowIndex, true),

    iconAlign: getPropertyValue(columnProperties.iconAlign, rowIndex, true),
    isCompact: getPropertyValue(columnProperties.isCompact, rowIndex),
    menuColor: getPropertyValue(columnProperties.menuColor, rowIndex, true),

    menuItems: getPropertyValue(columnProperties.menuItems, rowIndex),
    menuStyle: getPropertyValue(columnProperties.menuStyle, rowIndex, true),
    menuVariant: getPropertyValue(columnProperties.menuVariant, rowIndex, true),
  } as CellLayoutProperties;
};
