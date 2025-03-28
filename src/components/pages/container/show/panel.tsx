import { Box, Heading } from "@chakra-ui/react";
import React from "react";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
} from "@/components/ui/accordion";

export default function ContainerShowPanel({
  title,
  children,
  isOpen = false,
  count = -1,
  icon,
  noPadding = false,
}) {
  return (
    <AccordionItem
      value={title}
      defaultChecked={isOpen}
      disabled={count === 0}
      style={{
        boxShadow: "var(--chakra-shadows-md)",
        background: "var(--chakra-colors-gray-200)",
        marginBottom: "var(--chakra-space-6)",
        borderRadius: "var(--chakra-radii-md)",
      }}
    >
      <AccordionItemTrigger indicatorPlacement="end" p={3}>
        <Box flex="1" textAlign="left">
          <Heading as="h2" size="3xl">
            {icon} {count > -1 && (count > 0 ? count : "No")} {title}
          </Heading>
        </Box>
      </AccordionItemTrigger>
      <AccordionItemContent p={noPadding ? 0 : 4} bg="white">
        {children}
      </AccordionItemContent>
    </AccordionItem>
  );
}
