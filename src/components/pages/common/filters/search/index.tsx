import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import TextFilterInput from "./input";

export default function TextFilterPanel({ filterKey, translateKey, useIndexFilter }) {
  const { t } = useTranslation();
  const label = t(translateKey);

  return (
    <AccordionItem>
      <AccordionButton>
        <Box flex={1} textAlign="left">
          {label}
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        <TextFilterInput filterKey={filterKey} label={label} useIndexFilter={useIndexFilter} />
      </AccordionPanel>
    </AccordionItem>
  );
}
