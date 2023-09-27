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

import MediaType from "./media-type";
import TagFilterInput from "./tags";
import UserFilterInput from "./user";

export default function FiltersList() {
  const { t } = useTranslation();

  return (
    <Accordion allowMultiple={true}>
      <MediaType />
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <AccordionButton>
              <Box flex={1} textAlign="left">
                {t("Tags")}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>{isExpanded && <TagFilterInput filterKey="tags" />}</AccordionPanel>
          </>
        )}
      </AccordionItem>
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <AccordionButton>
              <Box flex={1} textAlign="left">
                {t("filters:user.title")}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>{isExpanded && <UserFilterInput filterKey="user" />}</AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
}
