import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { namedFormErrorMessage, typeCastSingle } from "@utils/field";
import React from "react";
import { useController } from "react-hook-form";
import { CastType } from "types/custom";

interface IRadioProps {
  helpText?: string;
  label?: string;
  name: string;
  placeholder?: string;
  title?: string;
  mb?: number;
  hint?: string;
  options?: any[];
  isInline?: boolean;
  isClearable?;
  castType?: CastType;
}

const defaultOptions = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

export const RadioInputField = ({
  helpText,
  label,
  name,
  placeholder,
  title,
  hint,
  mb = 4,
  isInline = true,
  options = defaultOptions,
  isClearable,
  ...props
}: IRadioProps) => {
  const { field, fieldState } = useController({ name });
  const defaultCastType = props.castType || typeof options?.[0]?.value;

  const handleOnReset = () => field.onChange("");

  return (
    <FormControl isInvalid={!!fieldState.error} mb={mb} {...props}>
      {label && <FormLabel htmlFor={name} children={label} />}
      <RadioGroup
        colorScheme="primary"
        id={name}
        {...field}
        value={String(field.value)}
        onChange={(v) => field.onChange(typeCastSingle(v, defaultCastType))}
      >
        <Stack direction={isInline ? "row" : "column"} py={2}>
          {options.map((o) => (
            <Radio key={o.value} value={String(o.value)}>
              {o.label}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>

      {isClearable && (
        <Button onClick={handleOnReset} size="xs">
          Clear
        </Button>
      )}

      <FormErrorMessage
        children={namedFormErrorMessage(fieldState?.error?.message, name, label || placeholder)}
      />
      {hint && <FormHelperText color="gray.600">{hint}</FormHelperText>}
    </FormControl>
  );
};
