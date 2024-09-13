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

import AggroforestryFilter from "./aggroforestry";
import EducationFilter from "./education";
import OtherEnterpriesFilter from "./farm-enterprises";
import FarmerIdFilter from "./farmer-id";
import { NumberFilter } from "./inputs/number-range";
import UserFilterInput from "./name-of-user";
import PhoneNumberFilter from "./phone";
import SexTypeFilter from "./sex-type";
import TimeFilter from "./time";
import VillageFilter from "./village";

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
            <AccordionPanel>{isExpanded && <UserFilterInput filterKey="farmerId" />}</AccordionPanel>
          </>
        )}
      </AccordionItem>

      <SexTypeFilter />
      <PhoneNumberFilter />

      <EducationFilter />

      <VillageFilter />

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
                Coffee Acreage
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {isExpanded && <NumberFilter filterKey="coffeeAcreage" />}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <AccordionButton>
              <Box flex={1} textAlign="left">
                No Of Coffee Trees
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
        {({ isExpanded }) => (
          <>
            <AccordionButton>
              <Box flex={1} textAlign="left">
                No Of Dependents
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {isExpanded && <NumberFilter filterKey="noOfDependents" />}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>

      <OtherEnterpriesFilter />

      <AggroforestryFilter />
      <TimeFilter />
    </Accordion>
  );
}
