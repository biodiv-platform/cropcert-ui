import { FormErrorMessage } from "@chakra-ui/react";
import React from "react";

interface ErrorMessageProps {
  error;
  name?;
  label?;
}

export default function ErrorMessage({ error, name, label }: ErrorMessageProps) {
  return <FormErrorMessage>{label && error ? error.replace(name, label) : error}</FormErrorMessage>;
}
