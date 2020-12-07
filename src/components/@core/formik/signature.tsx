import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/core";
import styled from "@emotion/styled";
import { FastField, useField } from "formik";
import React, { useRef } from "react";
import SignaturePad from "react-signature-canvas";

import ErrorMessage from "./common/error-message";

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
}) => {
  const [field, meta, helpers] = useField({ name, as: FastField });

  const ref: any = useRef(null);

  const onStrokeEnd = () => {
    helpers.setValue(ref.current.toDataURL());
    setTimeout(() => {
      helpers.setTouched(true);
      field.onBlur(name);
    }, 300);
  };

  return (
    <FormControl isInvalid={meta.touched && meta.error ? true : false} mb={mb} id={field.name}>
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
      <ErrorMessage error={meta.error} name={field.name} label={label} />
      {hint && <FormHelperText>{hintText}</FormHelperText>}
    </FormControl>
  );
};

export default SignatureInputField;
