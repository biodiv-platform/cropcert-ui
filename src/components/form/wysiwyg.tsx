import { namedFormErrorMessage } from "@utils/field";
import dynamic from "next/dynamic";
import React from "react";
import { useController } from "react-hook-form";

import { Field } from "../ui/field";

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
  fileUploadHandler?;
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
  fileUploadHandler,

  ...props
}: IWYSIWYGFieldProps) => {
  const { field, fieldState } = useController({ name });

  return (
    <Field
      invalid={!!fieldState.error}
      errorText={namedFormErrorMessage(fieldState?.error?.message, name, label)}
      mb={mb}
      htmlFor={field.name}
      label={label}
      colorPalette={"blue"}
      {...props}
    >
      <WYSIWYGEditor
        name={name}
        id={name}
        value={field.value}
        onEditorChange={field.onChange}
        placeholder={label}
        onBlur={field.onBlur}
        uploadHandler={uploadHandler}
        fileUploadHandler={fileUploadHandler}
      >
        {label}
      </WYSIWYGEditor>

      {hint && <Field color="gray.600" helperText={hint} />}
    </Field>
  );
};
