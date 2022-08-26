import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel } from "@chakra-ui/react";
import { getCoords } from "@utils/basic";
import { namedFormErrorMessage } from "@utils/field";
import React from "react";
import { useController } from "react-hook-form";
import Check2Icon from "src/icons/check2";

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
    <FormControl
      isInvalid={!!fieldState.error}
      mb={mb || 4}
      isRequired={isRequired}
      id={field.name}
    >
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Button
        mb={4}
        onClick={onGetLocationClick}
        leftIcon={field.value ? <Check2Icon /> : undefined}
      >
        {field.value || "Click to capture location"}
      </Button>
      <FormErrorMessage children={namedFormErrorMessage(fieldState?.error?.message, name, label)} />
      {hint && <FormHelperText color="gray.600">{hint}</FormHelperText>}
    </FormControl>
  );
};
