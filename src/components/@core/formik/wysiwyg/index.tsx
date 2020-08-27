import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from "@chakra-ui/core";
import { useField } from "formik";
import dynamic from "next/dynamic";
import React from "react";

const Editor = dynamic(() => import("./wysiwyg"), { ssr: false });

const wysiwygInput = ({ name, label, hint = false, hintText = "", mb = 4, ...props }) => {
  const [field, meta, helpers] = useField(name);

  const onEditorValueChange = (v) => helpers.setValue(v);

  return (
    <FormControl isInvalid={meta.touched && meta.error ? true : false} mb={mb}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Editor data={field.value} onUpdate={onEditorValueChange} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
      {hint && <FormHelperText>{hintText}</FormHelperText>}
    </FormControl>
  );
};

export default wysiwygInput;
