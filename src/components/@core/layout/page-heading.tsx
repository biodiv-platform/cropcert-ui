import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";

interface PageHeadingProps {
  children;
  mb?: number;
  actions?;
  [x: string]: any;
}

export default function PageHeading({
  children,
  mb = 4,
  actions,
  PreviousPageButton,
  ...props
}: PageHeadingProps) {
  return (
    <Flex alignItems={"center"} gap={2}>
      <Box mb={mb} mt={6}>
        {PreviousPageButton && PreviousPageButton}
      </Box>
      <Flex flex={1} justifyContent="space-between" alignItems="center" mb={mb} mt={6}>
        <Heading  size={"4xl"} display="inline-block" {...props}>
          {children}
        </Heading>
        {actions && actions}
      </Flex>
    </Flex>
  );
}
