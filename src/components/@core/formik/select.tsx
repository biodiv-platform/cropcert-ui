import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from "@chakra-ui/core";
import { Field } from "formik";
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
}) => (
  <Field name={name}>
    {({ field, meta, form }) => {
      const defaultValue = options.find(({ value }) => field.value === value);
      const [value, setValue] = useState<any>(defaultValue);

      useEffect(() => {
        form.setFieldValue(field.name, value ? value.value : "");
      }, [value]);

      useEffect(() => {
        if (selectOnOne) {
          options.length === 1 ? setValue({ ...options[0] }) : setValue("");
        }
      }, [options]);

      return (
        <FormControl isInvalid={meta.touched && meta.error} mb={mb}>
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <Select
            {...field}
            {...props}
            id={field.name}
            options={options}
            onChange={setValue}
            value={value}
            isSearchable={true}
            styles={{
              valueContainer: provided => ({
                ...provided,
                height: "38px"
              })
            }}
          />
          <FormErrorMessage>{meta.error && meta.error.replace(field.name, label)}</FormErrorMessage>
          {hint && <FormHelperText>{hintText}</FormHelperText>}
        </FormControl>
      );
    }}
  </Field>
);

export default SelectInputField;
