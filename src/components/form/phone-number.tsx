import { Box, Input } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import { useController } from "react-hook-form";
import MobileInput from "react-phone-number-input";

import { Field } from "../ui/field";

const PhoneFormControl = styled.div`
  .PhoneInput {
    position: relative;
    input {
      padding-left: 3rem;
    }
    .PhoneInputCountryIconImg {
      height: 1em;
      margin-top: 0.6rem;
    }
    .PhoneInputCountryIconUnicode,
    .PhoneInputCountryIcon {
      line-height: 2.5rem;
      padding: 0 0.7rem;
      font-size: 1.4rem;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      z-index: 2;
    }
    select {
      display: none;
    }
  }
`;

interface ISelectProps {
  name: string;
  label: string;
  mb?: number;
  disabled?: boolean;
  hint?: string;
  defaultCountry?: string;
  onBlur?;
}

export const PhoneNumberInputField = ({
  name,
  label,
  hint,
  mb = 4,
  defaultCountry,
  disabled = false,
  ...props
}: ISelectProps) => {
  const { field, fieldState } = useController({ name });

  return (
    <Field
      as={PhoneFormControl}
      invalid={!!fieldState.error}
      errorText={fieldState?.error?.message}
      mb={mb}
      htmlFor={field.name}
      label={label}
      {...props}
    >
      <Box width={"full"}>
        <MobileInput
          id={name}
          inputComponent={Input}
          countrySelectProps={{ unicodeFlags: true }}
          defaultCountry={defaultCountry as any}
          disabled={disabled}
          {...field}
        />
      </Box>
      {hint && <Field color="gray.600" helperText={hint} />}
    </Field>
  );
};
