import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { axUploadEditorPageResource } from "@services/pages.service";
import { namedFormErrorMessage } from "@utils/field";
import React from "react";
import { useDropzone } from "react-dropzone";
import { useController } from "react-hook-form";

interface DropzoneInputFieldProps {
  name: string;
  label: string;
  type?: string;
  hint?;
  placeholder?;
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

export const DropzoneInputField = ({
  name,
  label,
  hint,
  type = "Banner",
  placeholder,
  mb = 4,
}: DropzoneInputFieldProps) => {
  const { field, fieldState } = useController({ name });

  const handleOnClear = () => {
    field.onChange(null);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: axUploadEditorPageResource });

  return (
    <FormControl isInvalid={!!fieldState.error} mb={mb}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <DropzoneWrapper {...getRootProps()}>
        <input {...getInputProps()} />
        {field.value ? <img src={field.value} /> : <div>Drop {type} Image Here</div>}
      </DropzoneWrapper>
      <Button size="xs" isDisabled={!field.value} colorScheme="red" onClick={handleOnClear} mt={2}>
        Remove {type} Image
      </Button>
      <FormErrorMessage
        children={namedFormErrorMessage(fieldState?.error?.message, name, label || placeholder)}
      />
      {hint && <FormHelperText color="gray.600">{hint}</FormHelperText>}
    </FormControl>
  );
};
