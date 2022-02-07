import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from "@chakra-ui/react";
import { useField } from "formik";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";

const Editor = dynamic(() => import("./wysiwyg"), { ssr: false });

const wysiwygInput = ({ name, label, hint = false, hintText = "", mb = 4 }) => {
  const [field, meta, helpers] = useField(name);

  const onEditorValueChange = (v) => helpers.setValue(v);

  // this prevents tinmce to avoid force re-render when initialvalue is changed
  const initialValue = useMemo(() => field.value, []);

  return (
    <FormControl isInvalid={meta.touched && meta.error ? true : false} mb={mb}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Editor data={initialValue} onUpdate={onEditorValueChange} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
      {hint && <FormHelperText>{hintText}</FormHelperText>}
    </FormControl>
  );
};

export default wysiwygInput;
