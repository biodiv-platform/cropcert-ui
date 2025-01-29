import { Input } from "@chakra-ui/react";
import React from "react";
import { useWatch } from "react-hook-form";

import { Field } from "../ui/field";

export default function DisplayTextField({ name, label }) {
  const value = useWatch({ name });

  return (
    <Field htmlFor={name} label={label}>
      <Input type="text" readOnly={true} bg="white" value={value} />
    </Field>
  );
}
