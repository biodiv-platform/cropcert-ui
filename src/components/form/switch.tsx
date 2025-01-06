import { Box,Flex } from "@chakra-ui/react";
import { namedFormErrorMessage } from "@utils/field";
import React from "react";
import { useController } from "react-hook-form";

import { Field } from "../ui/field";
import { Switch } from "../ui/switch";

interface ITextBoxProps {
  name: string;
  label: string;
  mt?: number;
  mb?: number;
  pl?: number;
  disabled?: boolean;
  color?: string;
  hint?: string;
}

export const SwitchField = ({
  name,
  label,
  mb = 4,
  pl = 4,
  color = "blue",
  hint,
  disabled,
  ...props
}: ITextBoxProps) => {
  const { field, fieldState } = useController({ name });

  return (
    <Field
      invalid={!!fieldState.error}
      errorText={namedFormErrorMessage(fieldState?.error?.message, name, label)}
      mb={mb}
      htmlFor={field.name}
      {...props}
    >
      <Flex align="center">
        <Box as="label" mr={2}>
          {label}
        </Box>
        <Switch
          id={name}
          onBlur={field.onBlur}
          onChange={(e) => field.onChange(e.target["checked"])}
          defaultChecked={field.value}
          disabled={disabled}
          colorPalette={color}
          name={name}
          pl={pl}
        />
      </Flex>
      {hint && <Field color="gray.600" helperText={hint}></Field>}
    </Field>
  );
};
