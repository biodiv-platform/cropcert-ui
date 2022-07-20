import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import { namedFormErrorMessage } from "@utils/field";
import React from "react";
import { useController } from "react-hook-form";

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
    <FormControl
      isInvalid={!!fieldState.error}
      mb={mb}
      hidden={hidden}
      isRequired={isRequired}
      {...props}
    >
      {label && <FormLabel htmlFor={name} children={label} />}
      <Input
        id={name}
        placeholder={placeholder}
        type="number"
        colorScheme="primary"
        isDisabled={disabled}
        bg="white"
        {...field}
        onChange={handleOnFieldChange}
      />
      <FormErrorMessage children={namedFormErrorMessage(fieldState?.error?.message, name, label)} />
      {hint && <FormHelperText color="gray.600">{hint}</FormHelperText>}
    </FormControl>
  );
};
