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

import { NumberFilter } from "./inputs/number-range";
import TextFilterPanel from "./shared/search";
import TimeFilter from "./time";

export default function FiltersList() {
  const { t } = useTranslation();

  return (
    <Accordion allowMultiple={true}>
      <TextFilterPanel filterKey="farmerName" translateKey={"filters:farmer.name"} />
      <TextFilterPanel filterKey="village" translateKey={"filters:farmer.village"} />

      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <AccordionButton>
              <Box flex={1} textAlign="left">
                Land Acreage
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {isExpanded && <NumberFilter filterKey="landAcreage" />}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <AccordionButton>
              <Box flex={1} textAlign="left">
                Coffee Trees
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {isExpanded && <NumberFilter filterKey="noOfCoffeeTrees" />}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>

      <AccordionItem>
        <AccordionButton>
          <Box flex={1} textAlign="left">
            {t("filters:time.title")}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <TimeFilter />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
