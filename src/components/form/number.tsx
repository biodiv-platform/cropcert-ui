import { Input } from "@chakra-ui/react";
import { namedFormErrorMessage } from "@utils/field";
import React from "react";
import { useController } from "react-hook-form";

import { Field } from "../ui/field";

interface INumberInputProps {
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
  min?;
  max?;
  autoComplete?;
}

export const NumberInputField = ({
  name,
  title,
  label,
  helpText,
  placeholder,
  mb = 4,
  disabled,
  hint,
  isRequired,
  hidden,
  min,
  max,
  ...props
}: INumberInputProps) => {
  const { field, fieldState } = useController({
    name,
    defaultValue: null, // to prevent uncontrolled to controlled error
  });

  const handleOnFieldChange = (e) => {
    const v = e.target.value;
    field.onChange(v ? Number(v) : null);
  };

  return (
    <Field
      invalid={!!fieldState.error}
      errorText={namedFormErrorMessage(fieldState?.error?.message, name, label)}
      mb={mb}
      hidden={hidden}
      required={isRequired}
      {...props}
    >
      {label && <Field htmlFor={name} children={label} />}
      <Input
        id={name}
        placeholder={placeholder}
        type="number"
        colorScheme="blue"
        disabled={disabled}
        bg="white"
        {...field}
        onChange={handleOnFieldChange}
      />
      {hint && <Field color="gray.600" helperText={hint} />}
    </Field>
  );
};
