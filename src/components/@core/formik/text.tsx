import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from "@chakra-ui/core";
import { FastField, Field, useField } from "formik";
import React, { useMemo } from "react";

interface TextInputFieldProps {
  name: string;
  label?: string;
  hint?: boolean;
  hintText?: string;
  mb?: number;
  fast?: boolean;
  [prop: string]: any;
}

const TextInputField = ({
  name,
  label,
  hint,
  hintText,
  mb = 4,
  fast,
  ...props
}: TextInputFieldProps) => {
  const [field, meta] = useField({ name, as: fast ? FastField : Field });

  return (
    <FormControl isInvalid={meta.touched && meta.error ? true : false} mb={mb}>
      {label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
      <Input borderColor="gray.400" placeholder={label} {...field} {...props} />
      <FormErrorMessage>{meta.error && meta.error.replace(field.name, label)}</FormErrorMessage>
      {hint && <FormHelperText>{hintText}</FormHelperText>}
    </FormControl>
  );
};

export default TextInputField;
