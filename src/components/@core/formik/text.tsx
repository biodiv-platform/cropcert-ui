import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from "@chakra-ui/core";
import { FastField, Field } from "formik";
import React, { useMemo } from "react";

const TextInputField = ({
  name,
  label = null,
  hint = false,
  hintText = "",
  mb = 4,
  fast = false,
  ...props
}) => {
  const F = useMemo(() => (fast ? FastField : Field), []);

  return (
    <F name={name}>
      {({ field, meta }) => (
        <FormControl isInvalid={meta.touched && meta.error} mb={mb}>
          {label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
          <Input borderColor="gray.400" placeholder={label} {...field} {...props} />
          <FormErrorMessage>{meta.error && meta.error.replace(field.name, label)}</FormErrorMessage>
          {hint && <FormHelperText>{hintText}</FormHelperText>}
        </FormControl>
      )}
    </F>
  );
};

export default TextInputField;
