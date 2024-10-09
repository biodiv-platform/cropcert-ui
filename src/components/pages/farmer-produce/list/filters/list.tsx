import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import React from "react";

import FarmerIdFilter from "./farmer-id";
import FarmerNameFilter from "./farmer-name";
import { NumberFilter } from "./inputs/number-range";
import ProductTypeFilter from "./product-type";
import TimeFilter from "./time";

export default function FiltersList() {
  return (
    <Accordion allowMultiple={true}>
      <FarmerIdFilter />

      <FarmerNameFilter />

      <ProductTypeFilter />

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
      <TimeFilter />
    </Accordion>
  );
}
