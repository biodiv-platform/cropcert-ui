import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import React from "react";

import DeductionReasonFilter from "./deduction-reason";
import FarmerIdFilter from "./farmer-id";
import FarmerNameFilter from "./farmer-name";
import FarmerProduceIdFilter from "./farmer-produce-id";
import { NumberFilter } from "./inputs/number-range";
import PhoneNumberFilter from "./phone";
import ProductTypeFilter from "./product-type";
import TimeFilter from "./time";

export default function FiltersList() {
  return (
    <Accordion allowMultiple={true}>
      <FarmerProduceIdFilter />
      <FarmerIdFilter />

      <FarmerNameFilter />
      <PhoneNumberFilter />

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
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <AccordionButton>
              <Box flex={1} textAlign="left">
                No Of Bags
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>{isExpanded && <NumberFilter filterKey="noOfBags" />}</AccordionPanel>
          </>
        )}
      </AccordionItem>
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <AccordionButton>
              <Box flex={1} textAlign="left">
                Deduction
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>{isExpanded && <NumberFilter filterKey="deduction" />}</AccordionPanel>
          </>
        )}
      </AccordionItem>

      <DeductionReasonFilter />

      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <AccordionButton>
              <Box flex={1} textAlign="left">
                Net Collection
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {isExpanded && <NumberFilter filterKey="netCollection" />}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <AccordionButton>
              <Box flex={1} textAlign="left">
                Price Per Kg
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>{isExpanded && <NumberFilter filterKey="pricePerKg" />}</AccordionPanel>
          </>
        )}
      </AccordionItem>

      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <AccordionButton>
              <Box flex={1} textAlign="left">
                Amount Paid calculate
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {isExpanded && <NumberFilter filterKey="amountPaidCalculate" />}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>

      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <AccordionButton>
              <Box flex={1} textAlign="left">
                Milling Charge
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {isExpanded && <NumberFilter filterKey="millingCharge" />}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
      <TimeFilter />
    </Accordion>
  );
}
