import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from "@chakra-ui/react";
import { namedFormErrorMessage } from "@utils/field";
import dynamic from "next/dynamic";
import React from "react";
import { useController } from "react-hook-form";

const WYSIWYGEditor = dynamic(() => import("@components/@core/wysiwyg-editor"), {
  ssr: false,
});

interface IWYSIWYGFieldProps {
  helpText?: string;
  label: string;
  name: string;
  placeholder?: string;
  title?: string;
  mt?: number;
  mb?: number;
  hint?: string;
  uploadHandler?;
}

export const WYSIWYGField = ({
  helpText,
  label,
  name,
  placeholder,
  title,
  mb = 4,
  hint,
  uploadHandler,
  ...props
}: IWYSIWYGFieldProps) => {
  const { field, fieldState } = useController({ name });

  return (
    <FormControl isInvalid={!!fieldState.error} mb={mb} {...props}>
      {label && <FormLabel htmlFor={name} children={label} />}
      <WYSIWYGEditor
        name={name}
        id={name}
        value={field.value}
        onEditorChange={field.onChange}
        placeholder={label}
        onBlur={field.onBlur}
        uploadHandler={uploadHandler}
      >
        {label}
      </WYSIWYGEditor>

      <FormErrorMessage children={namedFormErrorMessage(fieldState?.error?.message, name, label)} />
      {hint && <FormHelperText color="gray.600">{hint}</FormHelperText>}
    </FormControl>
  );
};
