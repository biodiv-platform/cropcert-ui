import { Checkbox, FormControl, FormHelperText } from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

import ErrorMessage from "./common/error-message";

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
      <ErrorMessage error={meta.error} name={field.name} label={label} />
      {hint && <FormHelperText>{props.hintText}</FormHelperText>}
    </FormControl>
  );
};

export default CheckBoxInputField;
