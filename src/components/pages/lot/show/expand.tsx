import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { CoreGrid } from "@components/@core/layout";
import React from "react";

export const ExpandedSection = (data) => (
  <CoreGrid p={4} gap={6}>
    {data.modal.map((section) => (
      <Box border="1px dashed var(--chakra-colors-gray-100)" p={4} borderRadius="md">
        <Heading as="h3" size="md" mb={2}>
          {section.title}
        </Heading>
        {section.items.map((i) => (
          <Flex wrap="wrap" key={i.key} py={1}>
            <Text flexGrow={1}>{i.name}</Text>
            <Text alignSelf="right" width="auto">
              {data.data[i.key]}
            </Text>
          </Flex>
        ))}
      </Box>
    ))}
  </CoreGrid>
);
