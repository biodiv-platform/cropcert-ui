import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
import { useWatch } from "react-hook-form";

export default function DisplayTextField({ name, label }) {
  const value = useWatch({ name });

  return (
    <FormControl>
      {label && <FormLabel htmlFor={name} children={label} />}
      <Input type="text" isReadOnly={true} bg="white" value={value} />
    </FormControl>
  );
}
