import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from "@chakra-ui/core";
import { Field } from "formik";
import React from "react";

const hintMessage = (props) => {
  if (props?.min && props?.max) {
    return `Between ${props.min} to ${props.max}`;
  } else if (props?.max) {
    return `Maximum ${props.max}`;
  } else if (props?.min) {
    return `Minimum ${props.min}`;
  }
  return "";
};

const NumberInputField = ({ name, label, hint = false, mb = 4, isRequired = false, ...props }) => {
  const hintText = props.hintText || hintMessage(props);

  const onWheel = (e) => e.target.blur();

  return (
    <Field name={name}>
      {({ field, meta }) => (
        <FormControl isInvalid={meta.touched && meta.error} mb={mb} isRequired={isRequired}>
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <Input
            {...field}
            {...props}
            borderColor="gray.400"
            onWheel={onWheel}
            placeholder={label}
            type="number"
          />
          <FormErrorMessage>{meta.error && meta.error.replace(field.name, label)}</FormErrorMessage>
          {hint && <FormHelperText>{hintText}</FormHelperText>}
        </FormControl>
      )}
    </Field>
  );
};

export default NumberInputField;
