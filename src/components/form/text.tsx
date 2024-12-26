import { Input } from "@chakra-ui/react";
import React from "react";
import { useController } from "react-hook-form";

import { Field } from "../ui/field";

interface ITextBoxProps {
  id?: string;
  name: string;
  label?: string;
  type?: string;
  mb?: number;
  mt?: number;
  pl?: number;
  disabled?: boolean;
  hint?: string;
  style?;
  maxLength?;
  isRequired?: boolean;
  showLabel?: boolean;
  hidden?;
  autoComplete?;
  placeholder?;
}

export const TextBoxField = ({
  id,
  name,
  label,
  type = "text",
  mb = 4,
  mt = 0,
  pl = 4,
  disabled,
  hint,
  isRequired,
  showLabel = true,
  maxLength,
  hidden,
  autoComplete,
  placeholder,
  ...props
}: ITextBoxProps) => {
  const { field, fieldState } = useController({
    name,
    defaultValue: "", // to prevent uncontrolled to controlled error
  });

  return (
    <Field
      invalid={!!fieldState.error}
      errorText={fieldState?.error?.message}
      mb={mb}
      mt={mt}
      hidden={hidden}
      required={isRequired}
      {...props}
    >
      {label && showLabel && <Field htmlFor={name}>{label}</Field>}
      <Input
        id={id || name}
        placeholder={placeholder}
        type={type}
        maxLength={maxLength}
        disabled={disabled}
        autoComplete={autoComplete}
        pl={pl}
        {...field}
      />
      {maxLength && field.value && (
        <Field color="gray.600" helperText={`${field.value.length}/${maxLength}`} />
      )}
      {hint && <Field color="gray.600" helperText={hint}></Field>}
    </Field>
  );
};
