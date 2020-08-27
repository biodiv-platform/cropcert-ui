import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Image } from "@chakra-ui/core";
import styled from "@emotion/styled";
import { axUploadImage } from "@services/page.service";
import { FastField, useField } from "formik";
import React from "react";
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
  min-height: 13rem;
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

  const onDrop = async (acceptedFiles) => {
    const { success, data } = await axUploadImage(acceptedFiles[0]);
    if (success) {
      helpers.setValue(data.url);
      setTimeout(() => {
        helpers.setTouched(true);
        field.onBlur(name);
      }, 300);
    }
  };

  const handleOnClear = () => {
    helpers.setValue("");
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <FormControl isInvalid={meta.touched && meta.error ? true : false} mb={mb}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <DropzoneWrapper {...getRootProps()}>
        <input {...getInputProps()} />
        {field.value ? (
          <Image src={field.value} borderRadius="md" />
        ) : (
          <div>Drop Banner Image Here</div>
        )}

        {field.value && <button onClick={handleOnClear}>Remove</button>}
      </DropzoneWrapper>
      <FormErrorMessage>{meta.error && meta.error.replace(field.name, label)}</FormErrorMessage>
      {hint && <FormHelperText>{hintText}</FormHelperText>}
    </FormControl>
  );
};

export default DropzoneInputField;
