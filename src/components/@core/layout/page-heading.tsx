import { Flex, Heading } from "@chakra-ui/react";
import React from "react";

interface PageHeadingProps {
  children;
  mb?: number;
  actions?;
  [x: string]: any;
}

export default function PageHeading({ children, mb = 4, actions, ...props }: PageHeadingProps) {
  return (
    <Flex justifyContent="space-between" alignItems="center" mb={mb}>
      <Heading as="h1" display="inline-block" {...props}>
        {children}
      </Heading>
      {actions && actions}
    </Flex>
  );
}
