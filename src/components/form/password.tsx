import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
} from "@chakra-ui/react";
import { namedFormErrorMessage } from "@utils/field";
import React from "react";
import { useController } from "react-hook-form";

interface IPasswordInputProps {
  name: string;
  placeholder?: string;
  title?: string;
  label: string;
  helpText?: string;
  type?: string;
  mb?: number;
  disabled?: boolean;
  hint?: string;
  style?;
  maxLength?;
  isRequired?: boolean;
  hidden?;
  autoComplete?;
}

export const PasswordInputField = ({
  name,
  title,
  label,
  helpText,
  placeholder,
  mb = 4,
  disabled,
  hint,
  isRequired,
  maxLength,
  hidden,
  autoComplete,
  ...props
}: IPasswordInputProps) => {
  const { isOpen, onToggle } = useDisclosure();
  const { field, fieldState } = useController({ name, defaultValue: "" });

  return (
    <FormControl
      isInvalid={!!fieldState.error}
      mb={mb}
      hidden={hidden}
      isRequired={isRequired}
      {...props}
    >
      {label && <FormLabel htmlFor={name} children={label} />}
      <InputGroup size="md">
        <Input
          id={name}
          placeholder={placeholder}
          type={isOpen ? "text" : "password"}
          colorScheme="primary"
          maxLength={maxLength}
          isDisabled={disabled}
          autoComplete={autoComplete}
          bg="white"
          {...field}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={onToggle}>
            {isOpen ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage
        children={namedFormErrorMessage(fieldState?.error?.message, name, label || placeholder)}
      />
      {maxLength && field.value && (
        <FormHelperText color="gray.600" children={`${field.value.length}/${maxLength}`} />
      )}
      {hint && <FormHelperText color="gray.600">{hint}</FormHelperText>}
    </FormControl>
  );
};
