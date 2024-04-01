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

import AuthorFilter from "./author";
import DataQuality from "./data-quality";
import FarmerNameFilter from "./farmerName";
import FarmerVillageFilter from "./farmerVillage";
import ItemTypeFilter from "./itemType";
import LandAcreageFilter from "./landAcreage";
import NoOfCoffeeTreesFilter from "./noOfCoffeeTrees";
import PublisherFilter from "./publisher";
import TagsFilter from "./tags";
import TimeFilter from "./time";
import TitleFilter from "./title";
import UserFilter from "./user";
import FlagTypeFilter from "./flagType";
import GenderFilter from "./genderType";

export default function FiltersList() {
  const { t } = useTranslation();

  return (
    <Accordion defaultIndex={[0]} allowMultiple={true}>
      {/* <AccordionItem>
        <AccordionButton>
          <Box flex={1} textAlign="left">
            {t("Date")}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <TimeFilter />
        </AccordionPanel>
      </AccordionItem> */}

      <AccordionItem>
        <AccordionButton>
          <Box flex={1} textAlign="left">
            Data Quality
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <DataQuality />
        </AccordionPanel>
      </AccordionItem>

      {/* <FlagTypeFilter /> */}

      <AccordionItem>
        <AccordionButton>
          <Box flex={1} textAlign="left">
            Gender
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <GenderFilter />
        </AccordionPanel>
      </AccordionItem>

      <TitleFilter />

      <PublisherFilter />

      <AuthorFilter />

      <TagsFilter />
      <FarmerNameFilter />
      <FarmerVillageFilter />

      <AccordionItem>
        <AccordionButton>
          <Box flex={1} textAlign="left">
            No. of coffee trees
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <NoOfCoffeeTreesFilter />
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <AccordionButton>
          <Box flex={1} textAlign="left">
            Land Acreage
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <LandAcreageFilter />
        </AccordionPanel>
      </AccordionItem>

      {/*<AccordionItem>
        {({ isExpanded }) => (
          <>
            <AccordionButton>
              <Box flex={1} textAlign="left">
                {t("filters:user.title")}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>{isExpanded && <UserFilter filterKey="user" />}</AccordionPanel>
          </>
        )}
      </AccordionItem> */}
    </Accordion>
  );
}
