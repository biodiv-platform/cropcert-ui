import { TagsInput } from "@components/@core/tag-input";
import React from "react";
import { useController } from "react-hook-form";

import { Field } from "../ui/field";

interface TagsFieldProps {
  name: string;
  label: string;
  hint?: string;
  mb?;
}

export default function TagsField({ name, label, hint, mb }: TagsFieldProps) {
  const { field, fieldState } = useController({ name });

  return (
    <Field
      invalid={!!fieldState.error}
      errorText={fieldState?.error?.message}
      htmlFor={field.name}
      label={label}
      mb={mb || 4}
    >
      <TagsInput name={field.name} onChange={field.onChange} onBlur={field.onBlur} />
      {hint && <Field color="gray.600" helperText={hint}></Field>}
    </Field>
  );
}
