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

import UserFilterInput from "./name-of-user";

export default function FiltersList() {
  const { t } = useTranslation();

  return (
    <Accordion allowMultiple={true}>
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

    </Accordion>
  );
}
