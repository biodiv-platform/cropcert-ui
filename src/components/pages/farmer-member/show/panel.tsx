import { Box, Heading } from "@chakra-ui/react";
import React from "react";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
} from "@/components/ui/accordion";

interface FarmerShowPanelProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  count?: number;
  icon?: React.ReactNode;
  noPadding?: boolean;
}

export default function FarmerShowPanel({
  title,
  children,
  isOpen = false,
  count = -1,
  icon,
  noPadding = false,
}: FarmerShowPanelProps) {
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
      <AccordionItemContent>
        <Box p={noPadding ? 0 : 4} bg="white" style={{ display: isOpen ? "block" : "none" }}>
          {children}
        </Box>
      </AccordionItemContent>
    </AccordionItem>
  );
}
