import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from "@chakra-ui/core";
import { Field } from "formik";
import React, { useEffect, useState } from "react";
import Select from "react-select";

const MultiSelectInputField = ({
  name,
  label,
  hint = false,
  hintText = "",
  mb = 4,
  options = [],
  ...props
}) => (
  <Field name={name}>
    {({ field, meta, form }) => {
      const [value, setValue] = useState<any>();

      useEffect(() => {
        form.setFieldValue(field.name, value ? value.value : []);
      }, [value]);

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
            isMulti={true}
            styles={{
              valueContainer: provided => ({
                ...provided,
                height: "38px"
              })
            }}
          />
          <FormErrorMessage>{meta.error}</FormErrorMessage>
          {hint && <FormHelperText>{hintText}</FormHelperText>}
        </FormControl>
      );
    }}
  </Field>
);

export default MultiSelectInputField;
