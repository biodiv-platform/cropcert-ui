import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import React from "react";

import AggroforestryFilter from "./aggroforestry";
import EducationFilter from "./education";
import OtherEnterpriesFilter from "./farm-enterprises";
import FarmerIdFilter from "./farmer-id";
import FarmerNameFilter from "./farmer-name";
import { NumberFilter } from "./inputs/number-range";
import LocationVerifiedFilter from "./location-verified";
import PhoneNumberFilter from "./phone";
import SexTypeFilter from "./sex-type";
import TimeFilter from "./time";
import VillageFilter from "./village";

export default function FiltersList() {
  return (
    <Accordion allowMultiple={true}>
      <FarmerIdFilter />
      <FarmerNameFilter />
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

      <LocationVerifiedFilter />
      <TimeFilter />
    </Accordion>
  );
}
