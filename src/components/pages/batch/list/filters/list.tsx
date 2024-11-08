import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import React from "react";

import BatchNameFilter from "./batch-name";
import BatchStatusFilter from "./batch-status";
import { NumberFilter } from "./inputs/number-range";
import TimeFilter from "./time";
import TypeFilter from "./type";

export default function FiltersList() {
  return (
    <Accordion allowMultiple={true}>
      <BatchNameFilter />
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <AccordionButton>
              <Box flex={1} textAlign="left">
                Quantity
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>{isExpanded && <NumberFilter filterKey="quantity" />}</AccordionPanel>
          </>
        )}
      </AccordionItem>
      <BatchStatusFilter />
      <TypeFilter />
      <TimeFilter />
    </Accordion>
  );
}
