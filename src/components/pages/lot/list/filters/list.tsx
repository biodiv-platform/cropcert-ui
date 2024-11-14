import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import React from "react";

import { NumberFilter } from "./inputs/number-range";
import LotIdFilter from "./lot-id";
import LotNameFilter from "./lot-name";
import LotStatusFilter from "./lot-status";
import TimeFilter from "./time";
import TypeFilter from "./type";

export default function FiltersList() {
  return (
    <Accordion allowMultiple={true}>
      <LotIdFilter />
      <LotNameFilter />
      <TypeFilter />
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
      <LotStatusFilter />
      <TimeFilter />
    </Accordion>
  );
}
