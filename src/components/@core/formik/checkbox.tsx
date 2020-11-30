import { Checkbox, FormControl, FormErrorMessage, FormHelperText } from "@chakra-ui/core";
import { useField } from "formik";
import React from "react";

const CheckBoxInputField = ({
  name,
  label,
  hint = false,
  mb = 4,
  isDisabled = false,
  ...props
}) => {
  const [field, meta] = useField(name);

  return (
    <FormControl isInvalid={meta.touched && meta.error ? true : false} mb={mb} id={field.name}>
      <Checkbox {...field} {...props} isDisabled={isDisabled} isChecked={field.value}>
        {label}
      </Checkbox>
      <FormErrorMessage>{meta.error && meta.error.replace(field.name, label)}</FormErrorMessage>
      {hint && <FormHelperText>{props.hintText}</FormHelperText>}
    </FormControl>
  );
};

export default CheckBoxInputField;
