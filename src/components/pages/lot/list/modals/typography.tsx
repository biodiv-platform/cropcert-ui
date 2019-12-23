import { Heading } from "@chakra-ui/core";
import React from "react";

export default function FormHeading({ children }) {
  return (
    <Heading my={2} size="sm" fontSize="1.1rem">
      {children}
    </Heading>
  );
}
