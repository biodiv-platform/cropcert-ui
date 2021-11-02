import { Button, FormControl, FormHelperText, FormLabel } from "@chakra-ui/react";
import { getCoords } from "@utils/basic.util";
import { FastField, useField } from "formik";
import React from "react";
import Check2Icon from "src/icons/check2";

import ErrorMessage from "./common/error-message";

const GeolocationInputField = ({ name, label, hint = false, hintText = "", mb = 4 }) => {
  const [field, meta, helpers] = useField({ name, as: FastField });

  const onGetLocationClick = async () => {
    const coordinates = await getCoords();
    helpers.setValue(coordinates);
    setTimeout(() => {
      helpers.setTouched(true);
      field.onBlur(name);
    }, 300);
  };

  return (
    <FormControl isInvalid={meta.touched && meta.error ? true : false} mb={mb} id={field.name}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Button
        mb={4}
        onClick={onGetLocationClick}
        leftIcon={field.value ? <Check2Icon /> : undefined}
      >
        {field.value || "Click to capture location"}
      </Button>
      <ErrorMessage error={meta.error} name={field.name} label={label} />
      {hint && <FormHelperText>{hintText}</FormHelperText>}
    </FormControl>
  );
};

export default GeolocationInputField;
