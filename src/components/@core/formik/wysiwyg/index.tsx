import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from "@chakra-ui/core";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@harshzalavadiya/ckeditor5-build-classic";
import { ENDPOINT } from "@static/constants";
import { getTokens } from "@utils/auth.util";
import { useField } from "formik";
import React from "react";

export default function CKInput({ name, label, hint = false, hintText = "", mb = 4 }) {
  const [field, meta, helpers] = useField(name);
  const { accessToken } = getTokens();

  const onEditorValueChange = (_e, editor) => {
    const data = editor.getData();
    helpers.setValue(data);
  };

  return (
    <FormControl isInvalid={meta.touched && meta.error ? true : false} mb={mb}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <CKEditor
        config={{
          simpleUpload: {
            uploadUrl: `${ENDPOINT.PAGES}/image`,
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          },
        }}
        editor={ClassicEditor}
        data={field.value}
        onChange={onEditorValueChange}
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
      {hint && <FormHelperText>{hintText}</FormHelperText>}
    </FormControl>
  );
}
