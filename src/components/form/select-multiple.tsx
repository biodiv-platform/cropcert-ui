import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from "@chakra-ui/react";
import { namedFormErrorMessage } from "@utils/field";
import React from "react";
import { useController } from "react-hook-form";
import Select, { components } from "react-select";

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
    }),
  };

  return (
    <FormControl
      isInvalid={!!fieldState.error}
      className="dropdown"
      aria-invalid={!!fieldState.error}
      mb={mb}
      isRequired={isRequired}
      {...props}
    >
      {label && <FormLabel htmlFor={name} children={label} />}
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

      <FormErrorMessage
        children={namedFormErrorMessage(fieldState?.error?.message, name, label || placeholder)}
      />
      {hint && <FormHelperText color="gray.600">{hint}</FormHelperText>}
    </FormControl>
  );
};
