import { Textarea } from "@chakra-ui/react";
import { namedFormErrorMessage } from "@utils/field";
import React from "react";
import { useController } from "react-hook-form";

import { Field } from "../ui/field";

interface ITextAreaProps {
  helpText?: string;
  label: string;
  name: string;
  placeholder?: string;
  title?: string;
  mb?: number;
  disabled?: boolean;
  hint?: string;
  maxLength?;
  style?;
  isRequired?;
}

export const TextAreaField = ({
  helpText,
  label,
  name,
  placeholder,
  title,
  mb = 4,
  disabled,
  maxLength,
  hint,
  ...props
}: ITextAreaProps) => {
  const { field, fieldState } = useController({ name });

  return (
    <Field
      invalid={!!fieldState.error}
      errorText={namedFormErrorMessage(fieldState?.error?.message, name, label || placeholder)}
      mb={mb}
      {...props}
    >
      {label && <Field htmlFor={name} children={label} />}
      <Textarea
        id={name}
        placeholder={label}
        minH="124px"
        disabled={disabled}
        bg="white"
        maxLength={maxLength}
        {...field}
      />
      {maxLength && field.value && (
        <Field color="gray.600" helperText={`${field.value.length}/${maxLength}`} />
      )}
      {hint && <Field color="gray.600" helperText={hint} />}
    </Field>
  );
};
