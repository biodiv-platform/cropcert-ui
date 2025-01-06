import { Accordion, Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import { AccordionRoot } from "@/components/ui/accordion";

import AuthorFilter from "./author";
import DataQuality from "./data-quality";
import ItemTypeFilter from "./itemType";
import PublisherFilter from "./publisher";
import TagsFilter from "./tags";
import TimeFilter from "./time";
import TitleFilter from "./title";
import UserFilter from "./user";

const Location = dynamic(() => import("./location"), { ssr: false });

export default function FiltersList() {
  const { t } = useTranslation();

  return (
    <AccordionRoot multiple={true}>
      {/* <AccordionItem>
        <AccordionButton>
          <Box flex={1} textAlign="left">
            {t("filters:location.title")}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <Location />
        </AccordionPanel>
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

      <AccordionItem>
        <AccordionButton>
          <Box flex={1} textAlign="left">
            {t("filters:data_quality.title")}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <DataQuality />
        </AccordionPanel>
      </AccordionItem>

      <ItemTypeFilter />

      <TitleFilter />

      <PublisherFilter />

      <AuthorFilter />

      <TagsFilter />

      <AccordionItem>
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
    </AccordionRoot>
  );
}
