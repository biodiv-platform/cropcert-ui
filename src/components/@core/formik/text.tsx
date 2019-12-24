import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from "@chakra-ui/core";
import { Field } from "formik";
import React from "react";

const TextInputField = ({ name, label, hint = false, hintText = "", mb = 4, ...props }) => (
  <Field name={name}>
    {({ field, meta }) => (
      <FormControl isInvalid={meta.touched && meta.error} mb={mb}>
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
        <Input borderColor="gray.400" placeholder={label} {...field} {...props} />
        <FormErrorMessage>{meta.error && meta.error.replace(field.name, label)}</FormErrorMessage>
        {hint && <FormHelperText>{hintText}</FormHelperText>}
      </FormControl>
    )}
  </Field>
);

export default TextInputField;
