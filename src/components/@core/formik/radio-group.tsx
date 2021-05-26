import { FormControl, FormHelperText, FormLabel, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { FastField, useField } from "formik";
import React, { useMemo } from "react";

import ErrorMessage from "./common/error-message";

const defaultOptions = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

interface RadioGroupInputFieldProps {
  name: string;
  label?: string;
  hint?: boolean;
  hintText?: string;
  mb?: number;
  options?: { label: string; value: any }[];
}

const RadioGroupInputField = ({
  name,
  label,
  hint,
  hintText,
  mb = 4,
  options,
  ...props
}: RadioGroupInputFieldProps) => {
  const [field, meta, helpers] = useField({ name, as: FastField });

  const nOptions = options || defaultOptions;
  const value = useMemo(
    () => nOptions.findIndex(({ value }) => field.value === value).toString(),
    []
  );

  const onValueChange = (value) => {
    helpers.setValue(nOptions[value]?.value, true);
    setTimeout(() => {
      helpers.setTouched(true);
      field.onBlur(name);
    }, 1000);
  };

  return (
    <FormControl isInvalid={meta.touched && meta.error ? true : false} mb={mb} id={field.name}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <RadioGroup
        {...props}
        id={name}
        spacing={4}
        isInline={true}
        defaultValue={value}
        minH="40px"
        display="flex"
        alignItems="center"
        onChange={onValueChange}
      >
        <Stack direction="row">
          {nOptions.map(({ label }, index) => (
            <Radio key={index} value={index.toString()}>
              {label}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      <ErrorMessage error={meta.error} name={field.name} label={label} />
      {hint && <FormHelperText>{hintText}</FormHelperText>}
    </FormControl>
  );
};

export default RadioGroupInputField;
