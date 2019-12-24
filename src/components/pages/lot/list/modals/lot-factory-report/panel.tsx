import { Flex, Text } from "@chakra-ui/core";
import React from "react";

import FormHeading from "../typography";

export default function ReportPanel({ children, heading, footer }) {
  return (
    <Flex
      style={{ flexFlow: "column nowrap" }}
      px={3}
      borderRadius="md"
      border="1px dashed var(--gray-400)"
    >
      <FormHeading>{heading}</FormHeading>
      {children}
      <Text mb={2} style={{ marginTop: "auto" }}>
        {footer}
      </Text>
    </Flex>
  );
}
