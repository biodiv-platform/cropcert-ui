import { Flex, Text } from "@chakra-ui/react";
import React from "react";

import FormHeading from "../typography";

export default function ReportPanel({ children, heading, footer }) {
  return (
    <Flex
      style={{ flexFlow: "column nowrap" }}
      px={3}
      borderRadius="md"
      border="1px dashed var(--chakra-colors-gray-300)"
    >
      <FormHeading>{heading}</FormHeading>
      {children}
      <Text mb={2} style={{ marginTop: "auto" }}>
        {footer}
      </Text>
    </Flex>
  );
}
