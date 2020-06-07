import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from "@chakra-ui/core";
import { Field, FastField } from "formik";
import React, { useMemo } from "react";

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

const NumberInputField = ({
  name,
  label,
  hint = false,
  mb = 4,
  isRequired = false,
  fast = false,
  ...props
}) => {
  const hintText = props.hintText || hintMessage(props);
  const F = useMemo(() => (fast ? FastField : Field), []);

  const onWheel = (e) => e.target.blur();

  return (
    <F name={name}>
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
    </F>
  );
};

export default NumberInputField;
