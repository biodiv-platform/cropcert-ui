import { Flex, Heading } from "@chakra-ui/core";
import React from "react";

export default function PageHeading({ children, mb = 4, actions = null, ...props }) {
  return (
    <Flex justifyContent="space-between" alignItems="center" mb={mb}>
      <Heading as="h1" display="inline-block" {...props}>
        {children}
      </Heading>
      {actions}
    </Flex>
  );
}
