import styled from "@emotion/styled";
import { namedFormErrorMessage } from "@utils/field";
import React, { useRef } from "react";
import { useController } from "react-hook-form";
import SignaturePad from "react-signature-canvas";

import { Field } from "../ui/field";

const SignatureWrapper = styled.div`
  .declaration,
  .name,
  canvas {
    margin-bottom: 0.5rem;
  }
  canvas {
    border: 1px solid var(--chakra-colors-gray-300);
  }
  .declaration {
    opacity: 0.7;
  }
  .name {
    font-style: italic;
  }
`;

interface ISignatureInputProps {
  name: string;
  label: string;
  mb?: number;
  hint?: string;
  isRequired?: boolean;
  declaration;
  personName;
}

export const SignatureInputField = ({
  name,
  label,
  hint,
  mb,
  isRequired,
  declaration,
  personName,
}: ISignatureInputProps) => {
  const { field, fieldState } = useController({ name });
  const ref: any = useRef(null);

  const onStrokeEnd = () => field.onChange(ref.current.toDataURL());

  return (
    <Field
      invalid={!!fieldState.error}
      errorText={namedFormErrorMessage(fieldState?.error?.message, name, label)}
      mb={mb || 4}
      required={isRequired}
      htmlFor={field.name}
      label={label}
      id={field.name}
    >
      <SignatureWrapper>
        <div className="declaration">
          {declaration} - {personName}
        </div>
        <div className="name">
          <button onClick={() => ref.current.clear()}>Clear</button>
        </div>
        <SignaturePad
          {...field}
          id={field.name}
          canvasProps={{ width: 240, height: 150, className: "sigCanvas" }}
          onEnd={onStrokeEnd}
          ref={ref}
        />
      </SignatureWrapper>
      {hint && <Field color="gray.600" helperText={hint}></Field>}
    </Field>
  );
};
