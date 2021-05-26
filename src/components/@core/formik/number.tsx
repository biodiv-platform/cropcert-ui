import { FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import { FastField, Field, useField } from "formik";
import React from "react";

import ErrorMessage from "./common/error-message";

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

interface NumberInputFieldProps {
  name;
  label?;
  hint?: boolean;
  mb?: number;
  isRequired?: boolean;
  fast?: boolean;
  [x: string]: any;
}

const NumberInputField = ({
  name,
  label,
  hint = false,
  mb = 4,
  isRequired = false,
  fast = false,
  ...props
}: NumberInputFieldProps) => {
  const [field, meta] = useField({ name, as: fast ? FastField : Field });
  const hintText = props.hintText || hintMessage(props);

  const onWheel = (e) => e.target.blur();

  return (
    <FormControl
      isInvalid={meta.touched && meta.error ? true : false}
      mb={mb}
      isRequired={isRequired}
      id={field.name}
    >
      {label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
      <Input
        {...field}
        borderColor="gray.400"
        onWheel={onWheel}
        placeholder={label}
        type="number"
        {...props}
      />
      <ErrorMessage error={meta.error} name={field.name} label={label} />
      {hint && <FormHelperText>{hintText}</FormHelperText>}
    </FormControl>
  );
};

export default NumberInputField;
