import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import { namedFormErrorMessage } from "@utils/field";
import React from "react";
import { useController } from "react-hook-form";

interface ITextBoxProps {
  name: string;
  label: string;
  mt?: number;
  mb?: number;
  disabled?: boolean;
  color?: string;
  hint?: string;
}

export const SwitchField = ({
  name,
  label,
  mb = 4,
  color = "primary",
  hint,
  disabled,
  ...props
}: ITextBoxProps) => {
  const { field, fieldState } = useController({ name });

  return (
    <FormControl isInvalid={!!fieldState.error} mb={mb} {...props}>
      <Flex>
        {label && <FormLabel htmlFor={name} children={label} />}
        <Switch
          id={name}
          onBlur={field.onBlur}
          onChange={(e) => field.onChange(e.target["checked"])}
          defaultChecked={field.value}
          isDisabled={disabled}
          color={color}
          name={name}
        />
      </Flex>
      <FormErrorMessage children={namedFormErrorMessage(fieldState?.error?.message, name, label)} />
      {hint && <FormHelperText color="gray.600">{hint}</FormHelperText>}
    </FormControl>
  );
};
