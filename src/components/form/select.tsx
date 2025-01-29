import { namedFormErrorMessage } from "@utils/field";
import React from "react";
import { useController } from "react-hook-form";
import Select, { components } from "react-select";

import { Field } from "../ui/field";
import { reactSelectProps } from "./configs";

interface SelectInputFieldProps {
  helpText?: string;
  label: string;
  name: string;
  placeholder?: string;
  title?: string;
  mb?: number;
  disabled?: boolean;
  hint?: string;
  options?: any[];
  optionComponent?: any;
  selectRef?;
  isRequired?: boolean;
  isControlled?: boolean;
  onChangeCallback?;
  shouldPortal?;
  hidden?;
  isClearable?;
}
const DefaultOptionComponent = (p) => <components.Option {...p} />;

export const SelectInputField = ({
  helpText,
  label,
  name,
  placeholder,
  title,
  hint,
  mb = 4,
  options = [],
  disabled,
  selectRef,
  optionComponent = DefaultOptionComponent,
  isRequired,
  isControlled,
  shouldPortal,
  onChangeCallback,
  hidden,
  isClearable,
  ...props
}: SelectInputFieldProps) => {
  const { field, fieldState } = useController({ name });

  return (
    <Field
      invalid={!!fieldState.error}
      errorText={namedFormErrorMessage(fieldState?.error?.message, name, label || placeholder)}
      className="dropdown"
      aria-invalid={!!fieldState.error}
      mb={mb}
      hidden={hidden}
      required={isRequired}
      htmlFor={field.name}
      label={label}
      {...props}
    >
      <Select
        id={name}
        instanceId={name}
        inputId={name}
        onChange={(o) => {
          field.onChange(o?.value);
          onChangeCallback && onChangeCallback(o?.value);
        }}
        onBlur={field.onBlur}
        options={options}
        components={{
          Option: optionComponent,
        }}
        menuPortalTarget={process.browser && shouldPortal && document.body}
        isSearchable={true}
        isClearable={isClearable}
        isDisabled={disabled}
        {...{
          [isControlled ? "value" : "defaultValue"]: options.find((o) => o.value === field.value),
        }}
        ref={selectRef}
        {...reactSelectProps}
      />

      {hint && <Field color="gray.600" helperText={hint}></Field>}
    </Field>
  );
};
