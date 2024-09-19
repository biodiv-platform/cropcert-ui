import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import FarmerIdFilter from "./farmer-id";
import { NumberFilter } from "./inputs/number-range";
import UserFilterInput from "./name-of-user";
import ProductTypeFilter from "./product-type";
import TimeFilter from "./time";

export default function FiltersList() {
  const { t } = useTranslation();

  return (
    <Accordion allowMultiple={true}>
      <FarmerIdFilter />

      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <AccordionButton>
              <Box flex={1} textAlign="left">
                {t("filters:farmer.name")}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {isExpanded && <UserFilterInput filterKey="farmerId" />}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>

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
