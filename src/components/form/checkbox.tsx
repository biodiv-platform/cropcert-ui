import { Checkbox, FormControl, FormErrorMessage, FormHelperText } from "@chakra-ui/react";
import { namedFormErrorMessage } from "@utils/field";
import React from "react";
import { useController } from "react-hook-form";

interface ITextBoxProps {
  name: string;
  label;
  mt?: number;
  mb?: number;
  isDisabled?;
  hint?: string;
  children?;
}

export const CheckBoxField = ({
  name,
  label,
  mb = 4,
  hint,
  isDisabled,
  children,
  ...props
}: ITextBoxProps) => {
  const {
    field: { onChange, onBlur, value },
    fieldState,
  } = useController({ name });

  return (
    <FormControl isInvalid={!!fieldState.error} mb={mb} {...props}>
      <Checkbox
        name={name}
        onChange={(e) => onChange(e.target["checked"])}
        placeholder={label}
        onBlur={onBlur}
        defaultChecked={value}
        isDisabled={isDisabled}
        id={name}
      >
        {children || label}
      </Checkbox>

      <FormErrorMessage children={namedFormErrorMessage(fieldState?.error?.message, name, label)} />
      {hint && <FormHelperText color="gray.600">{hint}</FormHelperText>}
    </FormControl>
  );
};
