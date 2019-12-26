import {
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading
} from "@chakra-ui/core";
import React from "react";

export default function LotShowPanel({ title, children, isOpen = false, count = -1, icon }) {
  return (
    <AccordionItem defaultIsOpen={isOpen} isDisabled={count === 0}>
      <AccordionHeader px={0}>
        <Box flex="1" textAlign="left">
          <Heading as="h2" size="lg">
            {icon} {count > -1 && (count > 0 ? count : "No")} {title}
          </Heading>
        </Box>
        <AccordionIcon />
      </AccordionHeader>
      <AccordionPanel pt={4} pb={6} px={0}>
        {children}
      </AccordionPanel>
    </AccordionItem>
  );
}
