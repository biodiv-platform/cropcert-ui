import { namedFormErrorMessage } from "@utils/field";
import React from "react";
import { useController } from "react-hook-form";

import { Checkbox } from "../ui/checkbox";
import { Field } from "../ui/field";

interface ITextBoxProps {
  name: string;
  label;
  mt?: number;
  mb?: number;
  isDisabled?;
  hint?: string;
  children?;
  isRequired?: boolean;
  required?: boolean;
}

export const CheckBoxField = ({
  name,
  label,
  mb = 4,
  hint,
  isDisabled,
  children,
  isRequired,
  required,
  ...props
}: ITextBoxProps) => {
  const {
    field: { onChange, onBlur, value },
    fieldState,
  } = useController({ name });

  return (
    <Field
      invalid={!!fieldState.error}
      errorText={namedFormErrorMessage(fieldState?.error?.message, name, label)}
      mb={mb}
      required={required ?? isRequired}
      colorPalette={"blue"}
      {...props}
    >
      <Checkbox
        name={name}
        onChange={(e) => onChange(e.target["checked"])}
        onBlur={onBlur}
        disabled={isDisabled}
        checked={value}
        id={name}
      >
        {children || label}
      </Checkbox>

      {hint && <Field color="gray.600" helperText={hint} />}
    </Field>
  );
};
