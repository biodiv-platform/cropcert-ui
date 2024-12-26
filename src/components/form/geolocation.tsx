import { Button } from "@chakra-ui/react";
import { getCoords } from "@utils/basic";
import { namedFormErrorMessage } from "@utils/field";
import React from "react";
import { useController } from "react-hook-form";
import Check2Icon from "src/icons/check2";

import { Field } from "../ui/field";

interface IGeolocationInputProps {
  name: string;
  label: string;
  mb?: number;
  hint?: string;
  isRequired?: boolean;
}

export const GeolocationInputField = ({
  name,
  label,
  hint,
  mb,
  isRequired,
}: IGeolocationInputProps) => {
  const { field, fieldState } = useController({ name });

  const onGetLocationClick = async () => {
    const coordinates = await getCoords();
    field.onChange(coordinates);
  };

  return (
    <Field
      invalid={!!fieldState.error}
      errorText={namedFormErrorMessage(fieldState?.error?.message, name, label)}
      mb={mb || 4}
      required={isRequired}
      id={field.name}
    >
      <Field htmlFor={field.name}>{label}</Field>
      <Button mb={4} onClick={onGetLocationClick}>
        {field.value ? <Check2Icon /> : undefined}
        {field.value || "Click to capture location"}
      </Button>
      {hint && <Field color="gray.600" helperText={hint} />}
    </Field>
  );
};
