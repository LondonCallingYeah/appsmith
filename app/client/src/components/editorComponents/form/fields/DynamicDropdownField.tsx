import React from "react";
// @ts-expect-error: redux-form import
import { Field, BaseFieldProps } from "redux-form/dist/redux-form";
import DropdownComponent from "components/editorComponents/DropdownComponent";
import { DropdownOption } from "components/constants";

interface DynamicDropdownFieldOptions {
  options: DropdownOption[];
  height?: string;
  width?: string;
  placeholder: string;
}

type DynamicDropdownFieldProps = BaseFieldProps & DynamicDropdownFieldOptions;
class DynamicDropdownField extends React.Component<DynamicDropdownFieldProps> {
  render() {
    return <Field component={DropdownComponent} {...this.props} />;
  }
}

export default DynamicDropdownField;
