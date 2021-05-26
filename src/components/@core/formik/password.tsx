import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
} from "@chakra-ui/react";
import { FastField, Field, useField } from "formik";
import React from "react";

import ErrorMessage from "./common/error-message";

interface PasswordInputFieldProps {
  name: string;
  label?: string;
  hint?: boolean;
  hintText?: string;
  mb?: number;
  fast?: boolean;
  [prop: string]: any;
}

const PasswordInputField = ({
  name,
  label,
  hint,
  hintText,
  mb = 4,
  fast,
  ...props
}: PasswordInputFieldProps) => {
  const [field, meta] = useField({ name, as: fast ? FastField : Field });
  const { isOpen, onToggle } = useDisclosure();

  return (
    <FormControl isInvalid={meta.touched && meta.error ? true : false} mb={mb} id={field.name}>
      {label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
      <InputGroup size="md">
        <Input
          borderColor="gray.400"
          placeholder={label}
          type={isOpen ? "text" : "password"}
          {...field}
          {...props}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={onToggle}>
            {isOpen ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <ErrorMessage error={meta.error} name={field.name} label={label} />
      {hint && <FormHelperText>{hintText}</FormHelperText>}
    </FormControl>
  );
};

export default PasswordInputField;
