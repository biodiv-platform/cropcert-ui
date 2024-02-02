import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
import { useController } from "react-hook-form";

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
    <FormControl
      isInvalid={!!fieldState.error}
      mb={mb}
      mt={mt}
      hidden={hidden}
      isRequired={isRequired}
      {...props}
    >
      {label && showLabel && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Input
        id={id || name}
        placeholder={placeholder}
        type={type}
        maxLength={maxLength}
        isDisabled={disabled}
        autoComplete={autoComplete}
        pl={pl}
        {...field}
      />
      <FormErrorMessage children={fieldState?.error?.message} />
      {maxLength && field.value && (
        <FormHelperText color="gray.600" children={`${field.value.length}/${maxLength}`} />
      )}
      {hint && <FormHelperText color="gray.600">{hint}</FormHelperText>}
    </FormControl>
  );
};
