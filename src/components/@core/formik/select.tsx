import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from "@chakra-ui/core";
import { useField } from "formik";
import React, { useEffect, useState } from "react";
import Select from "react-select";

const SelectInputField = ({
  name,
  label,
  hint = false,
  hintText = "",
  mb = 4,
  options = [],
  selectOnOne = true,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);

  const defaultValue = options.find(({ value }) => field.value === value);
  const [value, setValue] = useState<any>(defaultValue);

  useEffect(() => {
    helpers.setValue(value ? value.value : "");
    setTimeout(() => {
      value?.value && helpers.setTouched(true);
    }, 1000);
  }, [value]);

  useEffect(() => {
    if (selectOnOne) {
      options.length === 1 ? setValue({ ...options[0] }) : setValue(defaultValue || "");
    }
  }, [options]);

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
        onBlur={field.onBlur}
        styles={{
          valueContainer: (provided) => ({
            ...provided,
            height: "38px",
          }),
        }}
      />
      <FormErrorMessage>{meta.error && meta.error.replace(field.name, label)}</FormErrorMessage>
      {hint && <FormHelperText>{hintText}</FormHelperText>}
    </FormControl>
  );
};

export default SelectInputField;
