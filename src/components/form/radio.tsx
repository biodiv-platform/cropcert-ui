import { Button, Stack } from "@chakra-ui/react";
import { CastType } from "@interfaces/custom";
import { namedFormErrorMessage, typeCastSingle } from "@utils/field";
import React from "react";
import { useController } from "react-hook-form";

import { Field } from "../ui/field";
import { Radio, RadioGroup } from "../ui/radio";

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
    <Field
      invalid={!!fieldState.error}
      errorText={namedFormErrorMessage(fieldState?.error?.message, name, label || placeholder)}
      mb={mb}
      {...props}
    >
      {label && <Field htmlFor={name} children={label} />}
      <RadioGroup
        colorScheme="blue"
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

      {hint && <Field color="gray.600" helperText={hint}></Field>}
    </Field>
  );
};
