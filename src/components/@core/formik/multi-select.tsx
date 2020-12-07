import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/core";
import { useField } from "formik";
import React, { useEffect, useState } from "react";
import Select from "react-select";

import ErrorMessage from "./common/error-message";

const MultiSelectInputField = ({
  name,
  label,
  hint = false,
  hintText = "",
  mb = 4,
  options = [] as any[],
  ...props
}) => {
  const [field, meta, helpers] = useField(name);

  const defaultValues =
    field.value.length > 0
      ? field.value
          .split(/(,(?=[\S\n]))/)
          .filter((v) => v !== ",")
          .map((v) => options.find((o) => o.value === v))
      : [];

  const [value, setValue] = useState(defaultValues);

  useEffect(() => {
    helpers.setValue(value.map((o) => o.value).toString());
    setTimeout(() => {
      helpers.setTouched(true);
      field.onBlur(name);
    }, 300);
  }, [value]);

  return (
    <FormControl isInvalid={meta.touched && meta.error ? true : false} mb={mb} id={field.name}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Select
        {...field}
        {...props}
        id={field.name}
        options={options}
        onChange={setValue}
        value={value}
        isSearchable={true}
        isMulti={true}
        onBlur={field.onBlur}
        styles={{
          valueContainer: (provided) => ({
            ...provided,
            height: "38px",
          }),
        }}
      />
      <ErrorMessage error={meta.error} name={field.name} label={label} />
      {hint && <FormHelperText>{hintText}</FormHelperText>}
    </FormControl>
  );
};

export default MultiSelectInputField;
