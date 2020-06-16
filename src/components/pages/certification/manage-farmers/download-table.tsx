import { Box, Text, Badge, Flex, Icon, InputGroup, InputLeftElement, Input } from "@chakra-ui/core";
import { CoreGrid } from "@components/@core/layout";
import React from "react";

import ActionButton from "./action-button";

export default function DownloadTable({ ccList }) {
  return ccList.length > 0 ? (
    <CoreGrid>
      {ccList.map(({ code, name }, index) => (
        <Flex
          bg="white"
          borderRadius="md"
          direction="column"
          className="fade"
          justify="space-between"
          p={4}
          border="1px solid"
          borderColor="gray.300"
          shadow="sm"
        >
          <Box mb={3} fontSize="xl">
            {code}. {name}
          </Box>
          <Box>
            <ActionButton ccCode={code} ccName={name} />
          </Box>
        </Flex>
      ))}
    </CoreGrid>
  ) : null;
}
