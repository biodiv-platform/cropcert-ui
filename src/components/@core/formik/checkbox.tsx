import { Checkbox, FormControl, FormErrorMessage, FormHelperText } from "@chakra-ui/core";
import { Field } from "formik";
import React from "react";

const CheckBoxInputField = ({
  name,
  label,
  hint = false,
  mb = 4,
  isDisabled = false,
  ...props
}) => {
  return (
    <Field name={name}>
      {({ field, meta }) => (
        <FormControl isInvalid={meta.touched && meta.error} mb={mb}>
          <Checkbox {...field} {...props} isDisabled={isDisabled} isChecked={field.value}>
            {label}
          </Checkbox>
          <FormErrorMessage>{meta.error}</FormErrorMessage>
          {hint && <FormHelperText>{props.hintText}</FormHelperText>}
        </FormControl>
      )}
    </Field>
  );
};

export default CheckBoxInputField;
