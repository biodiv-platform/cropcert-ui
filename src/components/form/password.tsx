import { namedFormErrorMessage } from "@utils/field";
import React from "react";
import { useController } from "react-hook-form";

import { Field } from "../ui/field";
import { PasswordInput } from "../ui/password-input";

interface IPasswordInputProps {
  name: string;
  placeholder?: string;
  title?: string;
  label: string;
  helpText?: string;
  type?: string;
  mb?: number;
  disabled?: boolean;
  hint?: string;
  style?;
  maxLength?;
  isRequired?: boolean;
  hidden?;
  autoComplete?;
}

export const PasswordInputField = ({
  name,
  title,
  label,
  helpText,
  placeholder,
  mb = 4,
  disabled,
  hint,
  isRequired,
  maxLength,
  hidden,
  autoComplete,
  ...props
}: IPasswordInputProps) => {
  const { field, fieldState } = useController({ name, defaultValue: "" });

  return (
    <Field
      invalid={!!fieldState.error}
      errorText={namedFormErrorMessage(fieldState?.error?.message, name, label || placeholder)}
      mb={mb}
      hidden={hidden}
      required={isRequired}
      htmlFor={field.name}
      label={label}
      {...props}
    >
      <PasswordInput {...field} />

      {maxLength && field.value && (
        <Field color="gray.600" helperText={`${field.value.length}/${maxLength}`} />
      )}
      {hint && <Field color="gray.600" helperText={hint}></Field>}
    </Field>
  );
};
