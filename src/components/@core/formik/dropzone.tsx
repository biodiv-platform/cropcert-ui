import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Spinner,
} from "@chakra-ui/core";
import styled from "@emotion/styled";
import { axUploadImage } from "@services/page.service";
import { FastField, useField } from "formik";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

interface DropzoneInputFieldProps {
  name: string;
  label: string;
  hint?: boolean;
  hintText?: string;
  mb?: number;
}

const DropzoneWrapper = styled.div`
  background: white;
  border: 1px dashed var(--gray-300);
  border-radius: 0.25rem;
  min-height: 11rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.75rem;
  img {
    max-width: 100%;
    height: auto;
  }
`;

const DropzoneInputField = ({ name, label, hint, hintText, mb = 4 }: DropzoneInputFieldProps) => {
  const [field, meta, helpers] = useField({ name, as: FastField });
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = async (acceptedFiles) => {
    setIsLoading(true);
    const { success, data } = await axUploadImage(acceptedFiles[0]);
    if (success) {
      helpers.setValue(data.url);
      setTimeout(() => {
        helpers.setTouched(true);
        field.onBlur(name);
      }, 300);
    }
    setIsLoading(false);
  };

  const handleOnClear = () => {
    helpers.setValue(null);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <FormControl isInvalid={meta.touched && meta.error ? true : false} mb={mb}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <DropzoneWrapper {...getRootProps()}>
        <input {...getInputProps()} />
        {isLoading ? (
          <Spinner />
        ) : field.value ? (
          <img src={field.value} />
        ) : (
          <div>Drop Banner Image Here</div>
        )}
      </DropzoneWrapper>
      <Button size="xs" isDisabled={!field.value} variantColor="red" onClick={handleOnClear} mt={2}>
        Remove Banner Image
      </Button>
      <FormErrorMessage>{meta.error && meta.error.replace(field.name, label)}</FormErrorMessage>
      {hint && <FormHelperText>{hintText}</FormHelperText>}
    </FormControl>
  );
};

export default DropzoneInputField;
