import {
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
} from "@chakra-ui/core";
import React from "react";

export default function LotShowPanel({
  title,
  children,
  isOpen = false,
  count = -1,
  icon,
  noPadding = false,
}) {
  return (
    <AccordionItem
      defaultIsOpen={isOpen}
      isDisabled={count === 0}
      boxShadow="md"
      bg="gray.200"
      mb={6}
      borderRadius="md"
      border="1px solid"
      borderColor="gray.200"
    >
      {({ isExpanded }) => (
        <>
          <AccordionHeader p={4}>
            <Box flex="1" textAlign="left">
              <Heading as="h2" size="lg">
                {icon} {count > -1 && (count > 0 ? count : "No")} {title}
              </Heading>
            </Box>
            <AccordionIcon />
          </AccordionHeader>
          <AccordionPanel p={noPadding ? 0 : 4} bg="white">
            {isExpanded && children}
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
}
