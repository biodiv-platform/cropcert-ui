import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Button } from "@chakra-ui/core";
import { Field } from "formik";
import React, { useRef } from "react";
import SignaturePad from "react-signature-canvas";
import styled from "@emotion/styled";

const SignatureWrapper = styled.div`
  .declaration,
  .name,
  canvas {
    margin-bottom: 0.5rem;
  }
  canvas {
    border: 1px solid var(--gray-300);
  }
  .declaration {
    opacity: 0.7;
  }
  .name {
    font-style: italic;
  }
`;

const SignatureInputField = ({
  name,
  label,
  declaration,
  personName,
  hint = false,
  hintText = "",
  mb = 4,
  ...props
}) => (
  <Field name={name}>
    {({ field, meta, form }) => {
      const ref = useRef(null);

      const onStrokeEnd = () => {
        form.setFieldValue(field.name, ref.current.toDataURL());
      };

      return (
        <FormControl isInvalid={meta.touched && meta.error} mb={mb}>
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <SignatureWrapper>
            <div className="declaration">
              {declaration} - {personName}
            </div>
            <div className="name">
              <button onClick={() => ref.current.clear()}>Clear</button>
            </div>
            <SignaturePad
              {...field}
              {...props}
              id={field.name}
              canvasProps={{ width: 240, height: 150, className: "sigCanvas" }}
              onEnd={onStrokeEnd}
              ref={ref}
            />
          </SignatureWrapper>
          <FormErrorMessage>{meta.error && meta.error.replace(field.name, label)}</FormErrorMessage>
          {hint && <FormHelperText>{hintText}</FormHelperText>}
        </FormControl>
      );
    }}
  </Field>
);

export default SignatureInputField;
