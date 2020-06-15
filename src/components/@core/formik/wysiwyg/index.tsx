import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from "@chakra-ui/core";
import { Field } from "formik";
import dynamic from "next/dynamic";
import React from "react";

const Editor = dynamic(() => import("./wysiwyg"), { ssr: false });

const wysiwygInput = ({ name, label, hint = false, hintText = "", mb = 4, ...props }) => (
  <Field name={name}>
    {({ field, meta, form }) => {
      const onEditorValueChange = (v) => form.setFieldValue(field.name, v);
      return (
        <FormControl isInvalid={meta.touched && meta.error} mb={mb}>
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <Editor data={field.value} onUpdate={onEditorValueChange} />
          <FormErrorMessage>{meta.error}</FormErrorMessage>
          {hint && <FormHelperText>{hintText}</FormHelperText>}
        </FormControl>
      );
    }}
  </Field>
);

export default wysiwygInput;
