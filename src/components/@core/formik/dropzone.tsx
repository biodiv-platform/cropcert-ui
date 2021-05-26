import { Button, FormControl, FormHelperText, FormLabel, Spinner } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { axUploadImage } from "@services/page.service";
import { FastField, useField } from "formik";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

import ErrorMessage from "./common/error-message";

interface DropzoneInputFieldProps {
  name: string;
  label: string;
  hint?: boolean;
  hintText?: string;
  mb?: number;
}

const DropzoneWrapper = styled.div`
  background: white;
  border: 1px dashed var(--chakra-colors-gray-300);
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
    <FormControl isInvalid={meta.touched && meta.error ? true : false} mb={mb} id={field.name}>
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
      <Button size="xs" isDisabled={!field.value} colorScheme="red" onClick={handleOnClear} mt={2}>
        Remove Banner Image
      </Button>
      <ErrorMessage error={meta.error} name={field.name} label={label} />
      {hint && <FormHelperText>{hintText}</FormHelperText>}
    </FormControl>
  );
};

export default DropzoneInputField;
