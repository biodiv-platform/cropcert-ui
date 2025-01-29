import { Box } from "@chakra-ui/react";
import { namedFormErrorMessage } from "@utils/field";
import React from "react";
import { useController } from "react-hook-form";
import Select, { components } from "react-select";

import { Field } from "../ui/field";
import { reactSelectProps } from "./configs";

interface SelectMultipleProps {
  helpText?: string;
  label?: string;
  name: string;
  placeholder?: string;
  title?: string;
  mb?: number;
  disabled?: boolean;
  hint?: string;
  options?: any[];
  optionComponent?: any;
  selectRef?;
  isRequired?: boolean;
  isSearchable?: boolean;
  isClearable?;
}

const DefaultOptionComponent = (p) => <components.Option {...p} />;

export const SelectMultipleInputField = ({
  helpText,
  label,
  name,
  placeholder,
  title,
  hint,
  mb = 4,
  optionComponent = DefaultOptionComponent,
  options = [],
  disabled,
  selectRef,
  isRequired,
  isSearchable,
  isClearable,
  ...props
}: SelectMultipleProps) => {
  const { field, fieldState } = useController({ name });
  const initialValue = options.filter((v) => (field.value || []).includes(v.value));

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      maxHeight: "200px",
      overflowY: "auto",
      paddingLeft: "10px",
      width: "100%",
    }),
  };

  return (
    <Field
      invalid={!!fieldState.error}
      errorText={namedFormErrorMessage(fieldState?.error?.message, name, label || placeholder)}
      className="dropdown"
      aria-invalid={!!fieldState.error}
      mb={mb}
      required={isRequired}
      htmlFor={field.name}
      label={label}
      {...props}
    >
      <Box width={"full"} p={4}>
        <Select
          id={name}
          instanceId={name}
          inputId={name}
          onChange={(o) => field.onChange(o ? o.map(({ value }) => value) : [])}
          onBlur={field.onBlur}
          options={options}
          components={{
            Option: optionComponent,
          }}
          defaultValue={initialValue}
          isSearchable={true}
          isMulti={true}
          isClearable={isClearable}
          isDisabled={disabled}
          ref={selectRef}
          {...reactSelectProps}
          styles={customStyles}
        />
      </Box>

      {hint && <Field color="gray.600" helperText={hint} />}
    </Field>
  );
};
